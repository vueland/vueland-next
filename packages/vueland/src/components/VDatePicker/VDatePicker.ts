// Vue API
import { computed, defineComponent, h, provide, reactive, ref } from 'vue'

// Composables
import { useColors } from '../../composables/use-colors'
import { elevationProps, useElevation } from '../../composables/use-elevation'
import { useTransition } from '../../composables/use-transition'
import { validationProps } from '../../composables/use-validation'

// Components
import { VTextField } from '../VTextField'
import { VDatepickerHeader } from './VDatepickerHeader'
import { VDatePickerDates } from './VDatePickerDates'
import { VDatePickerYears } from './VDatePickerYears'
import { VDatePickerMonths } from './VDatePickerMonths'
import { VMenu } from '../VMenu'

// Helpers
import { parseDate } from './helpers'
import { addScopedSlot } from '../../helpers'

// Utils
import { formatDate } from './utils'

// Types
import { VNode } from 'vue'
import { DatePickerBtnHandlers, DatePickerDate } from '../../../types'

// Services
import { locale } from '../../services/locale'

type DatePickerData = {
  year: number | null
  month: number | null
  date: number | null
  day: number | null
  selected: DatePickerDate | null
  tableMonth: number | null
  tableYear: number | null
  convertedDateString: string | null
  isYears: boolean
  isMonths: boolean
  isDates: boolean
  isActive: boolean
}

export default defineComponent({
  name: 'v-date-picker',
  props: {
    dark: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    readonly: Boolean,
    typeable: Boolean,
    mondayFirst: Boolean,
    today: Boolean,
    useMls: Boolean,
    useUtc: Boolean,
    lang: {
      type: String,
      default: 'en',
    },
    label: String,
    prependIcon: String,
    format: {
      type: String,
      default: 'yyyy MM dd D',
    },
    disabledDates: Object,
    highlighted: Object,
    contentColor: {
      type: String,
      default: 'primary',
    },
    color: {
      type: String,
      default: 'white',
    },
    ...validationProps(),
    ...elevationProps(),
  } as any,

  emits: [ 'update:modelValue', 'selected', 'open', 'close' ],

  setup(props, { emit, slots }) {
    const data: DatePickerData = reactive({
      year: null,
      month: null,
      date: null,
      day: null,
      selected: null,
      tableMonth: null,
      tableYear: null,
      convertedDateString: null,
      isYears: false,
      isMonths: false,
      isDates: true,
      isActive: false,
    })

    const {
      setTextClassNameColor,
      setTextCssColor,
      setBackgroundClassNameColor,
      setBackgroundCssColor,
    } = useColors()

    const { elevationClasses } = useElevation(props)

    const localeMonths: string[] = locale[props.lang].monthsAbbr
    const localeWeek: string[] = locale[props.lang].week
    const contentColor: string = props.dark ? 'white' : props.contentColor

    const handlers = ref<DatePickerBtnHandlers>({})
    const activator = ref<Maybe<VNode>>(null)
    const closeConditional = ref<boolean>(false)

    provide('handlers', handlers)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-date-picker': true,
      'v-date-picker--typeable': props.typeable,
      'v-date-picker--readonly': !props.typeable || props.readonly,
    }))

    const tableClasses = computed<Record<string, boolean>>(() => ({
      'v-date-picker__table': true,
      ...elevationClasses.value,
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
      ...(contentColor ? setTextClassNameColor(contentColor) : {}),
    }))

    const tableStyles = computed(() => ({
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
      ...(contentColor ? setTextCssColor(contentColor) : {}),
    }))

    const headerValue = computed<string>(() => data.isYears || data.isMonths
      ? `${ data.tableYear }`
      : data.isDates
        ? `${ data.tableYear } ${ localeMonths[data.tableMonth!] }`
        : ''
    )

    const displayDate = computed<string>(() => {
      const { month, date, day } = data.selected as DatePickerDate
      return `${ localeMonths[month] } ${ date } ${ localeWeek[day] }`
    })

    const computedValue = computed<string | number | Date>(() => {
      const { year, month, date } = data.selected as DatePickerDate
      return new Date(year, month, date as number)
    })

    const setInitDate = () => {
      if (props.value) setParsedDate(props.value)
      else if (props.modelValue) setParsedDate(props.modelValue)
      else setParsedDate()

      if (props.today || props.value || props.modelValue) {
        data.convertedDateString = convertToFormat() as string
      }
    }

    const onTableChange = (): undefined | boolean => {
      if (data.isYears) {
        data.isYears = false
        return (data.isMonths = true)
      }
      if (data.isMonths) {
        data.isMonths = false
        return (data.isYears = true)
      }
      if (data.isDates) {
        data.isDates = false
        return (data.isMonths = true)
      }

      return undefined
    }

    const setDataDate = <T extends DatePickerDate>({
      year,
      month,
      date,
      day,
    }: T) => {
      data.tableMonth = month
      data.tableYear = year

      data.year = year
      data.month = month
      data.date = date
      data.day = day
    }

    const setParsedDate = (selectedDate: string | null = null) => {
      const dateForParsing = selectedDate || new Date()

      data.selected = parseDate(dateForParsing)
      !selectedDate && (data.selected!.default = !selectedDate)

      setDataDate(data.selected!)
    }

    const onYearUpdate = (year: number) => {
      data.tableYear = year
      data.isMonths = true
      data.isYears = false
    }

    const onMonthUpdate = (month: number) => {
      data.tableMonth = month
      data.isMonths = false
      data.isYears = false
      data.isDates = true
    }

    const onDateUpdate = (date: DatePickerDate) => {
      if (!date) return

      closeConditional.value = true

      data.selected = date
      data.tableMonth = date.month
      data.tableYear = date.year

      data.convertedDateString = convertToFormat() as string

      emit('update:modelValue', computedValue.value)
      emit('selected', computedValue.value)

      requestAnimationFrame(() => (closeConditional.value = false))
    }

    const onDateMonthUpdate = (dateObject) => {
      data.tableMonth = dateObject.month
      if (dateObject.year) data.tableYear = dateObject.year
    }

    const onDateInput = (date: string): any => {
      onDateUpdate(stringToDate(date)!)
    }

    const stringToDate = (date: string): DatePickerDate | null => {
      if (date.length === 10) {
        const dateArray = date.trim().split(/\W/)

        if (dateArray[0].length < 4) {
          date = dateArray.reverse().join('.')
        }

        return parseDate(new Date(Date.parse(date)))
      }
      return null
    }

    const convertToFormat = (): string => {
      if (!data.selected) return ''
      return formatDate(
        new Date(
          data.selected!.year,
          data.selected!.month,
          data.selected!.date as number,
        ),
        props.format,
        locale[props.lang],
      )
    }

    const genDisplayValue = (value: string | number): VNode => {
      const propsData = {
        class: 'v-date-picker__display-value',
      }

      return useTransition(
        h('span', propsData, value),
        'scale-in-out',
        'out-in',
      )
    }

    const genDatepickerDisplayInner = (): VNode => h('div', {
      class: 'v-date-picker__display-inner',
    }, [
      genDisplayValue(data.selected?.year as number),
      genDisplayValue(displayDate.value),
    ])

    const genDatepickerDisplay = (): VNode => h('div', {
      class: {
        'v-date-picker__display': true,
        ...(contentColor ? setBackgroundClassNameColor(contentColor) : {}),
        ...(props.color ? setTextClassNameColor(props.color) : {}),
      },
      style: {
        ...(contentColor ? setBackgroundCssColor(contentColor) : {}),
        ...(props.color ? setTextCssColor(props.color) : {}),
      },
    }, genDatepickerDisplayInner())

    const genDatepickerHeader = (): VNode => h(VDatepickerHeader, {
        onNext: () => handlers.value.onNext!(),
        onPrev: () => handlers.value.onPrev!(),
        onTable: onTableChange,
      },
      {
        default: () => headerValue.value,
      },
    )

    const genDatepickerYearsTable = (): VNode => h(VDatePickerYears, {
      year: data.tableYear,
      ['onUpdate:year']: onYearUpdate,
    })

    const genDatepickerMonthsTable = (): VNode => h(VDatePickerMonths, {
      lang: props.lang,
      month: data.tableMonth,
      year: data.tableYear,
      locale: localeMonths,
      ['onUpdate:month']: onMonthUpdate,
      ['onUpdate:year']: onYearUpdate,
    })

    const genDatepickerDatesTable = (): VNode => h(VDatePickerDates, {
        locale: localeWeek,
        mondayFirst: props.mondayFirst,
        month: data.tableMonth,
        year: data.tableYear,
        value: data.selected,
        disabledDates: props.disabledDates,
        ['onUpdate:value']: onDateUpdate,
        ['onUpdate:month']: onDateMonthUpdate,
      },
      {
        date: slots.date && addScopedSlot('date', slots),
      },
    )

    const genDatepickerBody = (): VNode => h('div', {
        class: { 'v-date-picker__body': true },
      },
      useTransition(
        ((data.isYears && genDatepickerYearsTable()) ||
          (data.isMonths && genDatepickerMonthsTable()) ||
          (data.isDates && genDatepickerDatesTable())) as VNode,
        'slide-in-left',
        'out-in',
      ),
    )

    const genDatepickerInput = (): VNode => h(VTextField, {
      modelValue: data.convertedDateString!,
      dark: props.dark,
      label: props.label,
      readonly: !props.typeable,
      disabled: props.disabled,
      prependIcon: props.prependIcon,
      rules: props.rules,
      clearable: props.clearable,
      ref: activator,
      onInput: onDateInput,
      onClear: () => {
        data.convertedDateString = ''
        emit('update:modelValue', null)
        emit('selected', null)
      },
    })

    const genDatepickerTable = (): VNode => h('div', {
      class: tableClasses.value,
      style: tableStyles.value,
    }, [
      genDatepickerDisplay(),
      genDatepickerHeader(),
      genDatepickerBody(),
    ])

    const genMenu = () => h(VMenu, {
        activator: activator.value!,
        internalActivator: true,
        inputActivator: '.v-input__text-field',
        width: 'auto',
        maxHeight: 'auto',
        bottom: props.typeable,
        openOnClick: true,
        closeOnClick: closeConditional.value,
        onShow: () => emit('open'),
        onHide: () => emit('close')
      },
      {
        default: () => genDatepickerTable(),
      },
    )


    const genDatepicker = (): VNode => h('div', {
      class: classes.value,
    }, [
      genDatepickerInput(),
      activator.value && genMenu(),
    ])


    setInitDate()

    return () => genDatepicker()
  },
})
