// Styles
import './VDatepicker.scss'

// Vue API
import {
  h,
  ref,
  reactive,
  watch,
  provide,
  computed,
  defineComponent,
} from 'vue'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { useTransition } from '../../effects/use-transition'

// Helpers
import { parseDate } from './helpers'

// Components
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
}

const props: any = {
  dark: Boolean,
  mondayFirst: Boolean,
  millis: Boolean,
  toUtc: Boolean,
  lang: String,
  contentColor: String,
  value: [String, Date, Number],
  modelValue: [String, Date, Number],
  disabledDates: Object,
  highlighted: Object,
  ...colorProps(),
  ...elevationProps(),
}

export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  props,
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
    })

    const localeMonths: string[] = locale[props.lang].months
    const localeWeek: string[] = locale[props.lang].week
    const contentColor: string = props.dark ? 'white' : props.contentColor

    const handlers = ref<DatePickerBtnHandlers>({})

    const { setTextColor, setBackground } = useColors()
    const { elevationClasses } = useElevation(props)

    provide('handlers', handlers)

    watch(() => (props.value || props.modelValue), setParsedDate, { immediate: true })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-datepicker': true,
      ...elevationClasses.value,
    }))

    const headerValue = computed<string>(() => {
      return data.isYears || data.isMonths
        ? `${data.tableYear}` : data.isDates
          ? `${data.tableYear} ${localeMonths[data.tableMonth!]}` : ''
    })

    const displayDate = computed(() => {
      const { month, date, day } = data.selected as DatePickerDate
      return `${localeMonths[month]} ${date} ${localeWeek[day]}`
    })

    const computedValue = computed<string | number | Date>(() => {
      const { year, month, date } = data.selected as DatePickerDate
      const selectedDate = new Date(year, month, date as number)

      if (props.millis) return selectedDate.getTime()
      if (props.toUtc) return selectedDate.toUTCString()

      return selectedDate
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

    function setParsedDate(selectedDate) {
      const dateForParsing = selectedDate || new Date()
      const { year, month, day, date } = parseDate(dateForParsing)

      data.selected = { year, month, day, date }

      data.tableMonth = month
      data.tableYear = year

      data.year = year
      data.month = month
      data.date = date
      data.day = day
    }

    function onYearUpdate($event) {
      data.tableYear = $event
      data.isMonths = true
      data.isYears = false
    }

    function onMonthUpdate($event) {
      data.tableMonth = $event
      data.isMonths = false
      data.isYears = false
      data.isDates = true
    }

    function onDateUpdate($event) {
      data.selected = $event

      props.value && emit('update:value', computedValue.value)
      props.modelValue && emit('update:modelValue', computedValue.value)
      emit('selected', computedValue.value)
    }

    function onDateMonthUpdate($event) {
      data.tableMonth = $event.month
      if ($event.year) data.tableYear = $event.year
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

      return h('div', setTextColor(props.color, propsData), genDatepickerDisplayInner())
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
        (data.isDates && genDatepickerDatesTable())) as any,
        'slide-in-left',
        'out-in',
        ),
      )
    }

    return () => {
      const propsData = setBackground(props.color, {
        class: classes.value,
      })

      return h('div', setTextColor(contentColor, propsData), [
        genDatepickerDisplay(),
        genDatepickerHeader(),
        genDatepickerBody(),
      ])
    }
  },
})
