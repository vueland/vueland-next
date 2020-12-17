// Styles
import './VDatepicker.scss'

// Vue API
import {
  h,
  ref,
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
import { VDatepickerYears } from './VDatepickerYears'
import { VDatepickerMonths } from './VDatepickerMonths'
import { VDatepickerHeader } from './VDatepickerHeader'

// Services
import { locale } from '../../services/locale'

type Handlers = Partial<{
  onNext: () => any,
  onPrev: () => any
}>

const props: any = {
  dark: Boolean,
  lang: String,
  value: [String, Date],
  disabledDates: Object,
  highlighted: Object,
  ...colorProps(),
  ...elevationProps(),
}

export const VDatepicker = defineComponent({
  name: 'v-datepicker',
  props,
  setup(props) {
    const year = ref<number | null>(null)
    const month = ref<number | null>(null)
    const date = ref<number | null>(null)
    const day = ref<number | null>(null)

    const tableMonth = ref<number | null>(null)
    const tableYear = ref<number | null>(null)

    const isYears = ref<boolean>(false)
    const isMonths = ref<boolean>(true)

    const localeMonths = locale[props.lang].months
    const localeWeek = locale[props.lang].week

    const handlers = ref<Handlers>({})

    provide('handlers', handlers)

    const { setBackground } = useColors()
    const { elevationClasses } = useElevation(props)

    const setParsedDate = selectedDate => {
      const dateForParsing = selectedDate || new Date()
      const parsedDate = parseDate(dateForParsing)

      tableMonth.value = parsedDate.month
      tableYear.value = parsedDate.year

      year.value = parsedDate.year
      month.value = parsedDate.month
      date.value = parsedDate.date
      day.value = parsedDate.day ? parsedDate.day - 1 : 0
    }

    watch(() => props.value, setParsedDate, { immediate: true })

    const headerValue = computed<string>(() => {
      return (isYears.value || isMonths.value) ? `${ tableYear.value }` : ''
    })

    const onYearUpdate = ($event) => {
      tableYear.value = $event
      isMonths.value = true
      isYears.value = false
    }

    const onMonthUpdate = $event => {
      tableMonth.value = $event
      isMonths.value = false
      isYears.value = true
    }

    const genDisplayValue = value => {
      return useTransition({ transition: 'fade-in-down' },
        h('span', {
          class: {
            'v-datepicker__display-value': true,
          },
          key: value,
        }, value), 'out-in')
    }

    const genDatepickerDisplay = () => {
      return h('div', {
          class: {
            'v-datepicker__display': true,
          },
        }, [
          genDisplayValue(year.value),
          genDisplayValue(localeMonths[month.value]),
          genDisplayValue(date.value),
          genDisplayValue(localeWeek[day.value]),
        ],
      )
    }

    const genDatepickerHeader = () => {
      return h(VDatepickerHeader, {
        dark: props.dark,
        onNext: () => handlers.value.onNext!(),
        onPrev: () => handlers.value.onPrev!(),
      }, {
        default: () => headerValue.value,
      })
    }

    const genDatepickerYearsTable = () => {
      const propsData = {
        dark: props.dark,
        year: tableYear.value,
        ['onUpdate:year']: onYearUpdate
      }

      return h(VDatepickerYears, propsData)
    }

    const genDatepickerMonthsTable = () => {
      const propsData = {
        dark: props.dark,
        lang: props.lang,
        month: tableMonth.value,
        locale: localeMonths,
        ['onUpdate:month']: onMonthUpdate
      }

      return h(VDatepickerMonths, propsData)
    }

    const genDatepickerBody = () => {
      return h('div', {
        class: {
          'v-datepicker__body': true,
        },
      }, useTransition({ transition: 'slide-in-left' }, (
        isYears.value && genDatepickerYearsTable() ||
        isMonths.value && genDatepickerMonthsTable()
      ) as any, 'out-in'))
    }

    return () => {
      return h('div', setBackground(props.color, {
        class: {
          'v-datepicker': true,
          ...elevationClasses.value,
        },
      }), [
        genDatepickerDisplay(),
        genDatepickerHeader(),
        genDatepickerBody(),
      ])
    }
  },
})
