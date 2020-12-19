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
import { DatePickerBtnHandlers } from '../../types'

// Services
import { locale } from '../../services/locale'


type Data = {
  year: number | null
  month: number | null
  date: number | null
  day: number | null
  tableMonth: number | null
  tableYear: number | null
  isYears: boolean
  isMonths: boolean
  isDates: boolean
}

const props: any = {
  dark: Boolean,
  lang: String,
  textColor: String,
  value: [String, Date],
  disabledDates: Object,
  highlighted: Object,
  ...colorProps(),
  ...elevationProps(),
}

export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  props,
  setup(props, { emit }) {
    const data: Data = reactive({
      year: null,
      month: null,
      date: null,
      day: null,
      tableMonth: null,
      tableYear: null,
      isYears: false,
      isMonths: false,
      isDates: true,
    })

    const localeMonths: string[] = locale[props.lang].months
    const localeWeek: string[] = locale[props.lang].week
    const contentColor: string = props.dark ? 'white' : props.textColor

    const handlers = ref<DatePickerBtnHandlers>({})

    const { setTextColor, setBackground } = useColors()
    const { elevationClasses } = useElevation(props)

    provide('handlers', handlers)

    const setParsedDate = selectedDate => {
      const dateForParsing = selectedDate || new Date()
      const parsedDate = parseDate(dateForParsing)

      data.tableMonth = parsedDate.month
      data.tableYear = parsedDate.year

      data.year = parsedDate.year
      data.month = parsedDate.month
      data.date = parsedDate.date
      data.day = parsedDate.day ? parsedDate.day - 1 : 0
    }

    watch(() => props.value, setParsedDate, { immediate: true })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-datepicker': true,
      ...elevationClasses.value,
    }))

    const headerValue = computed<string>(() => {
      return data.isYears || data.isMonths
        ? `${ data.tableYear }`
        : data.isDates
          ? `${ data.tableYear } ${ localeMonths[data.tableMonth!] }`
          : ''
    })

    const onYearUpdate = $event => {
      data.tableYear = $event
      data.isMonths = true
      data.isYears = false
    }

    const onMonthUpdate = $event => {
      data.tableMonth = $event
      data.isMonths = false
      data.isYears = true
    }

    const onDateUpdate = $event => {
      emit('update:value', new Date(data.tableYear!, data.tableMonth!, $event))
    }

    const onDateMonthUpdate = $event => {
      data.tableMonth = $event.month
      if ($event.year) data.tableYear = $event.year
    }

    const genDisplayValue = value => {
      const propsData = {
        class: {
          'v-datepicker__display-value': true,
        },
        key: value,
      }

      return useTransition(
        h('span', propsData, value),
        'fade-in-down',
        'out-in',
      )
    }

    const genDatepickerDisplay = () => {
      const propsData = {
        class: {
          'v-datepicker__display': true,
        },
      }

      return h('div', propsData, [
        genDisplayValue(data.year),
        genDisplayValue(localeMonths[data.month!]),
        genDisplayValue(data.date),
        genDisplayValue(localeWeek[data.day!]),
      ])
    }

    const genDatepickerHeader = () => {
      return h(
        VDatepickerHeader,
        {
          onNext: () => handlers.value.onNext!(),
          onPrev: () => handlers.value.onPrev!(),
        },
        {
          default: () => headerValue.value,
        },
      )
    }

    const genDatepickerYearsTable = () => {
      const propsData = {
        year: data.tableYear,
        ['onUpdate:year']: onYearUpdate,
      }

      return h(VYears, propsData)
    }

    const genDatepickerMonthsTable = () => {
      const propsData = {
        lang: props.lang,
        month: data.tableMonth,
        localeMonths,
        ['onUpdate:month']: onMonthUpdate,
      }

      return h(VMonths, propsData)
    }

    const genDatepickerDatesTable = () => {
      return h(VDates, {
        localeWeek,
        month: data.tableMonth,
        year: data.tableYear,
        date: data.date,
        ['onUpdate:date']: onDateUpdate,
        ['onUpdate:month']: onDateMonthUpdate,
      })
    }

    const genDatepickerBody = () => {
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
