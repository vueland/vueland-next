// Styles
import './VDatePicker.scss'
// Vue API
// Directives
// Types
import {
  computed,
  defineComponent,
  h,
  provide,
  reactive,
  ref,
  VNode,
} from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { useTransition } from '../../effects/use-transition'
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
import { DatePickerBtnHandlers, DatePickerDate } from '../../types'
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

export const VDatePicker = defineComponent({
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
    rules: Array,
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object,
    contentColor: String,
    color: {
      type: String,
      default: 'white',
    },
    ...elevationProps(),
  } as any,

  emits: ['update:value', 'update:modelValue', 'selected'],

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

    const { setTextColor, setBackground } = useColors()
    const { elevationClasses } = useElevation(props)

    const localeMonths: string[] = locale[props.lang].monthsAbbr
    const localeWeek: string[] = locale[props.lang].week
    const contentColor: string = props.dark ? 'white' : props.contentColor

    const handlers = ref<DatePickerBtnHandlers>({})
    const closeConditional = ref<boolean>(true)

    provide('handlers', handlers)

    setInitDate()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-date-picker': true,
      'v-date-picker--typeable': props.typeable,
      'v-date-picker--readonly': !props.typeable || props.readonly,
    }))

    const tableClasses = computed<Record<string, boolean>>(() => ({
      'v-date-picker__table': true,
      ...elevationClasses.value,
    }))

    const headerValue = computed<string>(() => {
      return data.isYears || data.isMonths
        ? `${data.tableYear}`
        : data.isDates
        ? `${data.tableYear} ${localeMonths[data.tableMonth!]}`
        : ''
    })

    const displayDate = computed<string>(() => {
      const { month, date, day } = data.selected as DatePickerDate
      return `${localeMonths[month]} ${date} ${localeWeek[day]}`
    })

    const computedValue = computed<string | number | Date>(() => {
      const { year, month, date } = data.selected as DatePickerDate
      return new Date(year, month, date as number)
    })

    function setInitDate() {
      if (props.value) setParsedDate(props.value)
      else if (props.modelValue) setParsedDate(props.modelValue)
      else setParsedDate()

      if (props.today || props.value || props.modelValue) {
        data.convertedDateString = convertToFormat() as string
      }
    }

    function onTableChange(): void | boolean {
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
    }

    function setDataDate<T extends DatePickerDate>({
      year,
      month,
      date,
      day,
    }: T) {
      data.tableMonth = month
      data.tableYear = year

      data.year = year
      data.month = month
      data.date = date
      data.day = day
    }

    function setParsedDate(selectedDate: string | null = null) {
      const dateForParsing = selectedDate || new Date()

      data.selected = parseDate(dateForParsing)
      !selectedDate && (data.selected.default = !selectedDate)

      setDataDate(data.selected)
    }

    function onYearUpdate(year: number) {
      data.tableYear = year
      data.isMonths = true
      data.isYears = false
    }

    function onMonthUpdate(month: number) {
      data.tableMonth = month
      data.isMonths = false
      data.isYears = false
      data.isDates = true
    }

    function onDateUpdate(date: DatePickerDate) {
      if (!date) return

      data.selected = date
      data.tableMonth = date.month
      data.tableYear = date.year

      data.convertedDateString = convertToFormat() as string

      emit('update:value', computedValue.value)
      emit('update:modelValue', computedValue.value)
      emit('selected', computedValue.value)
    }

    function onDateMonthUpdate(dateObject) {
      data.tableMonth = dateObject.month
      if (dateObject.year) data.tableYear = dateObject.year
    }

    function onDateInput(date: string): any {
      onDateUpdate(stringToDate(date)!)
    }

    function stringToDate(date: string): DatePickerDate | null {
      if (date.length === 10) {
        const dateArray = date.trim().split(/\W/)

        if (dateArray[0].length < 4) {
          date = dateArray.reverse().join('.')
        }

        return parseDate(new Date(Date.parse(date)))
      }
      return null
    }

    function convertToFormat(): string {
      if (!data.selected) return ''
      return formatDate(
        new Date(
          data.selected!.year,
          data.selected!.month,
          data.selected!.date as number
        ),
        props.format,
        locale[props.lang]
      )
    }

    function genDisplayValue(value: string | number): VNode {
      const propsData = {
        class: 'v-date-picker__display-value',
      }

      return useTransition(
        h('span', propsData, value),
        'scale-in-out',
        'out-in'
      )
    }

    function genDatepickerDisplayInner(): VNode {
      const propsData = {
        class: 'v-date-picker__display-inner',
      }

      return h('div', propsData, [
        genDisplayValue(data.selected?.year as number),
        genDisplayValue(displayDate.value),
      ])
    }

    function genDatepickerDisplay(): VNode {
      const propsData = setBackground(props.contentColor, {
        class: {
          'v-date-picker__display': true,
        },
      })

      return h(
        'div',
        setTextColor(props.color, propsData),
        genDatepickerDisplayInner()
      )
    }

    function genDatepickerHeader(): VNode {
      return h(
        VDatepickerHeader,
        {
          onNext: () => handlers.value.onNext!(),
          onPrev: () => handlers.value.onPrev!(),
          onTable: onTableChange,
          onMouseenter: () => (closeConditional.value = false),
          onMouseleave: () =>
            (closeConditional.value = !data.isYears && !data.isMonths),
        },
        {
          default: () => headerValue.value,
        }
      )
    }

    function genDatepickerYearsTable(): VNode {
      const propsData = {
        year: data.tableYear,
        ['onUpdate:year']: onYearUpdate,
      }

      return h(VDatePickerYears, propsData)
    }

    function genDatepickerMonthsTable(): VNode {
      return h(VDatePickerMonths, {
        lang: props.lang,
        month: data.tableMonth,
        year: data.tableYear,
        locale: localeMonths,
        ['onUpdate:month']: onMonthUpdate,
        ['onUpdate:year']: onYearUpdate,
      })
    }

    function genDatepickerDatesTable(): VNode {
      return h(
        VDatePickerDates,
        {
          locale: localeWeek,
          mondayFirst: props.mondayFirst,
          month: data.tableMonth,
          year: data.tableYear,
          value: data.selected,
          disabledDates: props.disabledDates,
          ['onUpdate:value']: onDateUpdate,
          ['onUpdate:month']: onDateMonthUpdate,
          onMouseenter: () => (closeConditional.value = true),
        },
        {
          date: slots.date && addScopedSlot('date', slots),
        }
      )
    }

    function genDatepickerBody(): VNode {
      const propsData = {
        class: {
          'v-date-picker__body': true,
        },
      }

      return h(
        'div',
        propsData,
        useTransition(
          ((data.isYears && genDatepickerYearsTable()) ||
            (data.isMonths && genDatepickerMonthsTable()) ||
            (data.isDates && genDatepickerDatesTable())) as VNode,
          'slide-in-left',
          'out-in'
        )
      )
    }

    function genDatepickerInput(): VNode {
      return h(VTextField, {
        value: data.convertedDateString,
        dark: props.dark,
        label: props.label,
        readonly: !props.typeable,
        disabled: props.disabled,
        prependIcon: props.prependIcon,
        rules: props.rules,
        clearable: props.clearable,
        onInput: onDateInput,
        onClear: () => {
          data.convertedDateString = ''
          emit('update:value', null)
          emit('update:modelValue', null)
          emit('selected', null)
        },
      })
    }

    function genDatepickerTable(): VNode {
      const propsData = setBackground(props.color, {
        class: tableClasses.value,
      })

      return h('div', setTextColor(contentColor, propsData), [
        genDatepickerDisplay(),
        genDatepickerHeader(),
        genDatepickerBody(),
      ])
    }

    function genMenu() {
      return h(
        VMenu,
        {
          width: 'auto',
          maxHeight: 'auto',
          bottom: props.typeable,
          openOnClick: true,
          closeOnContentClick: closeConditional.value,
        },
        {
          default: () => genDatepickerTable(),
        }
      )
    }

    function genDatepicker(): VNode {
      const propsData = {
        class: classes.value,
      }

      return h('div', propsData, [genDatepickerInput(), genMenu()])
    }

    return () => genDatepicker()
  },
})
