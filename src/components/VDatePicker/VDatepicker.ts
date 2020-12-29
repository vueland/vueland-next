// Styles
import './VDatepicker.scss'

// Vue API
import {
  h,
  ref,
  reactive,
  // watch,
  provide,
  computed,
  withDirectives,
  defineComponent,
} from 'vue'

// Directives
import { vShow } from 'vue'
import { vClickOutside } from '../../directives'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { useTransition } from '../../effects/use-transition'

// Helpers
import { parseDate } from './helpers'
import { warning } from '../../helpers'

// Components
import { VTextField } from '../VTextField'
import { VDatepickerHeader } from './VDatepickerHeader'
import { VDates } from './VDates'
import { VYears } from './VYears'
import { VMonths } from './VMonths'

// Types
import { VNode } from 'vue'
import { DatePickerBtnHandlers, DatePickerDate } from '../../types'

// Services
import { locale } from '../../services/locale'

type Data = {
  year: number | null
  month: number | null
  date: number | null
  day: number | null
  selected: DatePickerDate | null
  tableMonth: number | null
  tableYear: number | null
  isYears: boolean
  isMonths: boolean
  isDates: boolean
  isActive: boolean
}

export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  props: {
    dark: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    mondayFirst: Boolean,
    today: Boolean,
    useMls: Boolean,
    useUtc: Boolean,
    lang: String,
    contentColor: String,
    label: String,
    format: {
      type: String,
      default: 'yyyy-mm-dd',
    },
    rules: Array,
    value: [String, Date, Number],
    modelValue: [String, Date, Number],
    disabledDates: Object,
    highlighted: Object,
    ...colorProps(),
    ...elevationProps(),
  } as any,
  emits: [
    'update:value',
    'update:modelValue',
    'selected',
  ],
  setup(props, { emit }) {
    const data: Data = reactive({
      year: null,
      month: null,
      date: null,
      day: null,
      selected: null,
      tableMonth: null,
      tableYear: null,
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

    if (props.value) setParsedDate(props.value)
    else if (props.modelValue) setParsedDate(props.modelValue)
    else setParsedDate()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-datepicker__table': true,
      ...elevationClasses.value,
    }))

    const headerValue = computed<string>(() => {
      return data.isYears || data.isMonths
        ? `${ data.tableYear }` : data.isDates
          ? `${ data.tableYear } ${ localeMonths[data.tableMonth!] }` : ''
    })

    const displayDate = computed(() => {
      const { month, date, day } = data.selected as DatePickerDate
      return `${ localeMonths[month] } ${ date } ${ localeWeek[day] }`
    })

    const computedValue = computed<string | number | Date>(() => {
      const { year, month, date } = data.selected as DatePickerDate
      const selectedDate = new Date(year, month, date as number)

      if (props.useMls) return selectedDate.getTime()
      if (props.useUtc) return selectedDate.toUTCString()
      return selectedDate
    })

    const directive = computed<object | undefined>(() => {
      return data.isActive ? {
        handler: () => data.isActive = false,
        closeConditional: false,
      } : undefined
    })

    function onTableChange(): void | boolean {
      if (data.isYears) {
        data.isYears = false
        return data.isMonths = true
      }
      if (data.isMonths) {
        data.isMonths = false
        return data.isYears = true
      }
      if (data.isDates) {
        data.isDates = false
        return data.isMonths = true
      }
    }

    function setDataDate({ year, month, date, day }) {
      data.tableMonth = month
      data.tableYear = year

      data.year = year
      data.month = month
      data.date = date
      data.day = day
    }

    function setParsedDate(selectedDate = null) {
      const dateForParsing = selectedDate || new Date()

      data.selected = parseDate(dateForParsing)
      setDataDate(data.selected)
    }

    function onYearUpdate($event: number) {
      data.tableYear = $event
      data.isMonths = true
      data.isYears = false
    }

    function onMonthUpdate($event: number) {
      data.tableMonth = $event
      data.isMonths = false
      data.isYears = false
      data.isDates = true
    }

    function onDateUpdate($event: DatePickerDate) {
      data.selected = $event
      setDataDate(data.selected)

      emit('update:value', computedValue.value)
      emit('update:modelValue', computedValue.value)

      emit('selected', computedValue.value)
      data.isActive = false
    }

    function onDateMonthUpdate($event) {
      data.tableMonth = $event.month
      if ($event.year) data.tableYear = $event.year
    }

    function onDateInput($event: string) {
      data.isActive = false
      if ($event.length !== props.format.length) return

      onDateUpdate(stringToDate($event)!)
    }

    function divideWithSeparator(str) {
      const matchArray = str.match(/\W/)
      const separator = matchArray && matchArray[0]

      if (separator) {
        const divided = str.split(separator)
        return { separator, divided }
      }

      return warning(`the date string should be in ${ props.format } format`)
    }

    function stringToDate(stringDate: string): DatePickerDate | undefined {
      const dateObject = {}
      const formattedDate = divideWithSeparator(stringDate)
      const formatObject = divideWithSeparator(props.format) as any

      if (formattedDate) {
        formatObject.divided.forEach((it, i) => {
          dateObject[it] = +formattedDate.divided[i]
        })

        const { yyyy, mm, dd } = dateObject as any

        return parseDate(new Date(yyyy, mm - 1, dd))
      }

      return undefined
    }

    function formatDate(): string {
      if (!props.value
        && !props.modelValue
        && !props.today
      ) return ''

      const { divided, separator } = divideWithSeparator(props.format) as any
      const formatObject = {
        y: data.selected!.year,
        m: data.selected!.month + 1,
        d: data.selected!.date,
      }

      let dateString = ''

      for (let i = 0; i < divided.length; i += 1) {
        if (divided[i].length === 2 && formatObject[divided[i][0]] < 10) {
          dateString += ('0' + formatObject[divided[i][0]])
        } else {
          dateString += formatObject[divided[i][0]]
        }
        dateString += (i < divided.length - 1 ? separator : '')
      }

      return dateString
    }

    function genDisplayValue(value: string | number): VNode {
      const propsData = {
        class: {
          'v-datepicker__display-value': true,
        },
        key: value,
      }

      return useTransition(
        h('span', propsData, value),
        'scale-in-out',
        'out-in',
      )
    }

    function genDatepickerDisplayInner() {
      return h('div', {
        class: 'v-datepicker__display-inner',
      }, [
        genDisplayValue(data.selected!.year as number),
        genDisplayValue(displayDate.value),
      ])
    }

    function genDatepickerDisplay(): VNode {
      const propsData = setBackground(props.contentColor, {
        class: {
          'v-datepicker__display': true,
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

      return h(VYears, propsData)
    }

    function genDatepickerMonthsTable(): VNode {
      return h(VMonths, {
        lang: props.lang,
        month: data.tableMonth,
        year: data.tableYear,
        localeMonths,
        ['onUpdate:month']: onMonthUpdate,
        ['onUpdate:year']: onYearUpdate,
      })
    }

    function genDatepickerDatesTable(): VNode {
      return h(VDates, {
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
      return h('div', {
          class: {
            'v-datepicker__body': true,
          },
        }, useTransition(((data.isYears && genDatepickerYearsTable()) ||
        (data.isMonths && genDatepickerMonthsTable()) ||
        (data.isDates && genDatepickerDatesTable())) as VNode,
        'slide-in-left',
        'out-in',
        ),
      )
    }

    function genDatepickerInput() {
      return h(VTextField, {
        value: formatDate(),
        label: props.label,
        readonly: props.readonly,
        disabled: props.disabled,
        rules: props.rules,
        onFocus: () => data.isActive = true,
        onInput: onDateInput,
      })
    }

    function genDatepickerTable() {
      const propsData = setBackground(props.color, {
        class: classes.value,
      })

      return withDirectives(h('div',
        setTextColor(contentColor, propsData),
        [
          genDatepickerDisplay(),
          genDatepickerHeader(),
          genDatepickerBody(),
        ]), [[vShow, data.isActive]])
    }

    function genDatepicker() {
      return withDirectives(h('div', {
        class: {
          'v-datepicker': true,
        },
      }, [
        genDatepickerInput(),
        useTransition(genDatepickerTable(), 'fade'),
      ]), [[vClickOutside, directive.value]])
    }

    return () => genDatepicker()
  },
})
