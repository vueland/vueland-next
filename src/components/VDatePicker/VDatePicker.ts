// Styles
import './VDatePicker.scss'

// Vue API
import {
  h,
  ref,
  reactive,
  provide,
  computed,
  withDirectives,
  defineComponent,
} from 'vue'

// Directives
import { vShow } from 'vue'
import { clickOutside } from '../../directives'

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

// Helpers
import { parseDate } from './helpers'

// Utils
import { dateStringSeparator } from './util'

// Types
import { VNode } from 'vue'
import { DatePickerBtnHandlers, DatePickerDate, DateParams } from '../../types'

// Services
import { locale } from '../../services/locale'

type DatePickerData = {
  year: number | null
  month: number | null
  date: number | null
  day: number | null
  selected: DatePickerDate | null
  tableMonth: number | null
  tableYear: number | null,
  convertedDateString: string | null,
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
    readonly: {
      type: Boolean,
      default: true
    },
    mondayFirst: Boolean,
    today: Boolean,
    useMls: Boolean,
    useUtc: Boolean,
    useIso: Boolean,
    useJson: Boolean,
    lang: {
      type: String,
      default: 'en',
    },
    contentColor: String,
    label: String,
    prependIcon: String,
    format: {
      type: String,
      default: 'yyyy-mm-dd',
    },
    rules: Array,
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object,
    color: {
      type: String,
      default: 'white',
    },
    ...elevationProps(),
  } as any,

  emits: [
    'update:value',
    'update:modelValue',
    'selected',
  ],

  setup(props, { emit }) {
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

    const localeMonths: string[] = locale[props.lang].months
    const localeWeek: string[] = locale[props.lang].week
    const contentColor: string = props.dark ? 'white' : props.contentColor

    const handlers = ref<DatePickerBtnHandlers>({})

    const { setTextColor, setBackground } = useColors()
    const { elevationClasses } = useElevation(props)

    provide('handlers', handlers)

    setInitDate()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-date-picker': true,
      'v-date-picker--typeable': !props.readonly,
      'v-date-picker--readonly': props.readonly,
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
      const selectedDate = new Date(year, month, date as number)

      if (props.useMls) return selectedDate.getTime()
      if (props.useUtc) return selectedDate.toUTCString()
      if (props.useIso) return selectedDate.toISOString()
      if (props.useJson) return selectedDate.toJSON()

      return selectedDate
    })

    const directive = computed<object | undefined>(() => {
      return data.isActive
        ? {
          handler: () => (data.isActive = false),
          closeConditional: false,
        }
        : undefined
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

    function setDataDate<T extends DatePickerDate>(
      { year, month, date, day }: T,
    ) {
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

      const converted = convertToFormat() as string
      const dateValue = computedValue.value || converted

      data.convertedDateString = converted

      emit('update:value', dateValue)
      emit('update:modelValue', dateValue)
      emit('selected', dateValue)

      data.isActive = false
    }

    function onDateMonthUpdate(dateObject) {
      data.tableMonth = dateObject.month
      if (dateObject.year) data.tableYear = dateObject.year
    }

    function onDateInput(date: string): any {
      data.isActive = false

      data.convertedDateString = null

      if (date.length !== props.format.length) return

      onDateUpdate(stringToDate(date)!)
    }

    function stringToDate(stringDate: string): DatePickerDate | null {
      const date = {} as DateParams
      const { separated: dateArray } = dateStringSeparator(stringDate)!
      const { separated } = dateStringSeparator(props.format)!

      if (!separated) return null

      separated.forEach((it, i) => date[it] = +dateArray[i])

      return parseDate(new Date(date.yyyy, date.mm - 1, date.dd))

    }

    function convertToFormat(): string {
      if (!data.selected) return ''

      const { separated, symbol } = dateStringSeparator(props.format) as any
      const isLocale = separated.includes('MM')

      const formatObject = {
        yyyy: data.selected!.year,
        mm: data.selected!.month + 1,
        dd: data.selected!.date,
        MM: localeMonths[data.selected!.month],
      } as DateParams

      let dateString = ''

      for (const val of separated) {

        if (val.length === 2 && formatObject[val] < 10) {
          dateString += '0' + formatObject[val]
        } else {
          dateString += formatObject[val]
        }
        dateString += dateString.length < 10 ? !isLocale ? symbol : ' ' : ''
      }

      return dateString
    }

    function genDisplayValue(value: string | number): VNode {
      const propsData = {
        class: {
          'v-date-picker__display-value': true,
        },
      }

      return useTransition(
        h('span', propsData, value),
        'scale-in-out',
        'out-in',
      )
    }

    function genDatepickerDisplayInner(): VNode {
      return h(
        'div',
        {
          class: 'v-date-picker__display-inner',
        },
        [
          genDisplayValue(data.selected!.year as number),
          genDisplayValue(displayDate.value),
        ],
      )
    }

    function genDatepickerDisplay(): VNode {
      const propsData = setBackground(props.contentColor, {
        class: {
          'v-date-picker__display': true,
        },
      })

      return h('div',
        setTextColor(props.color, propsData),
        genDatepickerDisplayInner(),
      )
    }

    function genDatepickerHeader(): VNode {
      return h(
        VDatepickerHeader,
        {
          onNext: () => handlers.value.onNext!(),
          onPrev: () => handlers.value.onPrev!(),
          onTable: onTableChange,
        },
        {
          default: () => headerValue.value,
        },
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
        localeMonths,
        ['onUpdate:month']: onMonthUpdate,
        ['onUpdate:year']: onYearUpdate,
      })
    }

    function genDatepickerDatesTable(): VNode {
      return h(VDatePickerDates, {
        localeWeek,
        mondayFirst: props.mondayFirst,
        month: data.tableMonth,
        year: data.tableYear,
        value: data.selected,
        ['onUpdate:value']: onDateUpdate,
        ['onUpdate:month']: onDateMonthUpdate,
      })
    }

    function genDatepickerBody(): VNode {
      const propsData = {
        class: {
          'v-date-picker__body': true,
        },
      }

      return h('div', propsData, useTransition(
        ((data.isYears && genDatepickerYearsTable()) ||
          (data.isMonths && genDatepickerMonthsTable()) ||
          (data.isDates && genDatepickerDatesTable())) as VNode,
        'slide-in-left',
        'out-in',
        ),
      )
    }

    function genDatepickerInput(): VNode {
      return h(VTextField, {
        value: data.convertedDateString,
        dark: props.dark,
        label: props.label,
        readonly: props.readonly,
        disabled: props.disabled,
        prependIcon: props.prependIcon,
        rules: props.rules,
        clearable: props.clearable,
        onFocus: () => (data.isActive = true),
        onInput: onDateInput,
      })
    }

    function genDatepickerTable(): VNode {
      const propsData = setBackground(props.color, {
        class: tableClasses.value,
      })

      return withDirectives(
        h('div', setTextColor(contentColor, propsData), [
          genDatepickerDisplay(),
          genDatepickerHeader(),
          genDatepickerBody(),
        ]),
        [[vShow, data.isActive]],
      )
    }

    function genDatepicker(): VNode {
      const propsData = {
        class: classes.value,
      }

      return withDirectives(
        h('div', propsData, [
            genDatepickerInput(),
            useTransition(genDatepickerTable(), 'fade'),
          ],
        ),
        [[clickOutside, directive.value]],
      )
    }

    return () => genDatepicker()
  },
})
