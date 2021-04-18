// Styles
import './VDatePickerDates.scss'

// Vue API
import { h, ref, inject, computed, watch, defineComponent } from 'vue'

// Helpers
import { genTableRows, parseDate } from './helpers'

// Effects
import { useTransition } from '../../effects/use-transition'

// Types
import { VNode, Ref } from 'vue'
import { DatePickerBtnHandlers, DatePickerDate } from '../../types'

type UpdateParams = {
  month?: number;
  year?: number;
};

export const VDatePickerDates = defineComponent({
  name: 'v-date-picker-dates',

  props: {
    localWeek: Array,
    year: [String, Number],
    month: [String, Number],
    date: [String, Number],
    value: Object,
    mondayFirst: Boolean,
  } as any,

  emits: [
    'update:month',
    'update:value',
  ],

  setup(props, { emit }): () => VNode {
    const FIRST_MONTH = 0
    const LAST_MONTH = 11
    const WEEK = [0, 1, 2, 3, 4, 5, 6]
    const ANIMATION_TIMEOUT = 100

    const dates = ref<(Date | null)[]>([])
    const isDatesChanged = ref<boolean>(false)
    const today = parseDate(new Date())

    const handlers = inject('handlers') as Ref<DatePickerBtnHandlers>

    handlers.value = {
      onNext: () => updateMonth(true),
      onPrev: () => updateMonth(false),
    }

    if (props.mondayFirst) {
      WEEK.push(WEEK.splice(0, 1)[0])
    }

    const daysInMonth = computed<number>(() => {
      return new Date(props.year, props.month + 1, 0).getDate()
    })

    watch(
      () => props.month,
      () => genTableDates(),
      { immediate: true },
    )

    watch(
      () => isDatesChanged.value,
      () =>
        setTimeout(() => {
          isDatesChanged.value = false
        }, ANIMATION_TIMEOUT),
    )

    function updateMonth(isNext: boolean) {
      const params: UpdateParams = {}

      params.month = props.month + (isNext ? 1 : -1)

      if (!isNext && params.month! < FIRST_MONTH) params.month = LAST_MONTH
      if (isNext && params.month! > LAST_MONTH) params.month = FIRST_MONTH
      if (isNext && !params.month) params.year = props.year + 1
      if (!isNext && params.month === LAST_MONTH) params.year = props.year - 1

      isDatesChanged.value = true
      emit('update:month', params)
    }

    function genWeekDays(): VNode[] {
      const propsData = {
        class: 'v-date-picker-dates__day',
      }

      return WEEK.map((day) =>
        h('span', propsData, props.localWeek![day] as string),
      )
    }

    function genDateObject(date): DatePickerDate {
      const { year, month } = props
      return parseDate(new Date(year, month, date))
    }

    function setEmptiesBeforeFirstDate(dateObject) {
      const firstDay = WEEK[0]

      const startDay = firstDay && !dateObject.day ? dateObject.day : firstDay

      const tillDay =
        firstDay && !dateObject.day ? WEEK.length - 1 : dateObject.day

      for (let i = startDay; i <= tillDay; i += 1) {
        dates.value[i] = { date: null } as any
      }

      dates.value[tillDay] = dateObject
    }

    function genTableDates() {
      dates.value = []

      for (let i = 1; i <= daysInMonth.value; i += 1) {
        const dateObject = genDateObject(i)

        if (i === 1) {
          setEmptiesBeforeFirstDate(dateObject)
        } else {
          dates.value[dates.value.length] = dateObject as any
        }
      }
    }

    function compareDates(date1, date2) {
      return (
        date1.date === date2.date &&
        date1.month === date2.month &&
        date1.year === date2.year
      )
    }

    function genDateCell(dateObject): VNode {
      const propsData = {
        class: {
          'v-date-picker-dates__cell': !!dateObject.date,
          'v-date-picker-dates__cell--empty': !dateObject.date,
          'v-date-picker-dates__cell--selected': compareDates(
            dateObject,
            props.value,
          ),
          'v-date-picker-dates__cell--current-date': compareDates(
            dateObject,
            today,
          ),
          'v-date-picker-dates__cell--holiday': dateObject.isHoliday,
        },
        onClick: () => dateObject.date && emit('update:value', dateObject),
      }

      return h('div', propsData, dateObject.date)
    }

    function genDateCells(): VNode[] {
      return dates.value.reduce((acc, dateObject) => {
        acc.push(genDateCell(dateObject))
        return acc
      }, [] as any)
    }

    function genDateRows(): VNode[] {
      const datesVNodes = genDateCells()

      return genTableRows(datesVNodes, 'v-date-picker-dates__row', WEEK.length)
    }

    function genDates(): VNode | null {
      return (
        (!isDatesChanged.value &&
          h('div', { class: 'v-date-picker-dates__dates' }, genDateRows())) ||
        null
      )
    }

    function genWeek(): VNode {
      return h('div', { class: 'v-date-picker-dates__week' }, genWeekDays())
    }

    return () =>
      h('div', { class: 'v-date-picker-dates' }, [
        genWeek(),
        useTransition(genDates() as any, 'fade'),
      ])
  },
})
