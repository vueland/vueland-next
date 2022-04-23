// Vue API
import { h, ref, inject, computed, watch, defineComponent } from 'vue'

// Helpers
import { genTableRows, parseDate, toDateString } from './helpers'

// Effects
import { useTransition } from '../../effects/use-transition'

// Types
import { VNode, Ref } from 'vue'
import { DatePickerBtnHandlers, DatePickerDate, Nullable } from '../../../types'

type UpdateParams = {
  month?: number
  year?: number
}

export const VDatePickerDates = defineComponent({
  name: 'v-date-picker-dates',

  props: {
    locale: Array,
    year: [String, Number],
    month: [String, Number],
    date: [String, Number],
    value: Object,
    mondayFirst: Boolean,
    disabledDates: Object,
  } as any,

  emits: ['update:month', 'update:value'],

  setup(props, { emit, slots }): () => VNode {
    const FIRST_MONTH = 0
    const LAST_MONTH = 11
    const DAYS = [0, 1, 2, 3, 4, 5, 6]
    const ANIMATION_TIMEOUT = 0

    const dates = ref<(DatePickerDate | null)[]>([])
    const isDatesChanged = ref<boolean>(false)
    const today = parseDate(new Date())

    const handlers = inject('handlers') as Ref<DatePickerBtnHandlers>

    handlers.value = {
      onNext: () => updateMonth(true),
      onPrev: () => updateMonth(false),
    }

    if (props.mondayFirst) {
      DAYS.push(DAYS.splice(0, 1)[0])
    }

    const daysInMonth = computed<number>(() => {
      return new Date(props.year, props.month + 1, 0).getDate()
    })

    watch(
      () => props.month,
      () => genTableDates(),
      { immediate: true }
    )

    watch(
      () => isDatesChanged.value,
      () => setTimeout(() => (isDatesChanged.value = false), ANIMATION_TIMEOUT)
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

      return DAYS.map((day) =>
        h('span', propsData, props.locale![day] as string)
      )
    }

    function genDateObject(date): DatePickerDate {
      const { year, month } = props
      return parseDate(new Date(year, month, date))
    }

    function setEmptiesBeforeFirstDate(dateObject) {
      const firstDay = DAYS[0]
      const startDay = firstDay && !dateObject.day ? dateObject.day : firstDay
      const tillDay =
        firstDay && !dateObject.day ? DAYS.length - 1 : dateObject.day

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

    function setDisabled(date: DatePickerDate): boolean {
      if (!date.date) return false
      if (!props.disabledDates) return !!date.isHoliday

      const { disabledDates } = props

      return (
        (disabledDates.daysOfMonth && disableDaysOfMonth(date)) ||
        (disabledDates.from && disableFromTo(date, disabledDates)) ||
        (disabledDates.dates && disableDates(date)) ||
        (disabledDates.days && disableDays(date)) ||
        (disabledDates.ranges && disableRanges(date)) ||
        (disabledDates.custom && disabledDates.custom(date))
      )
    }

    function disableFromTo(date: DatePickerDate, { from, to }): boolean {
      const dateFrom: DatePickerDate = parseDate(from)
      const dateTo: DatePickerDate = parseDate(to)

      return date.mls >= dateFrom.mls && date.mls <= dateTo.mls
    }

    function disableDaysOfMonth(date: DatePickerDate): boolean {
      return props.disabledDates.daysOfMonth.some((it) => it === date.date)
    }

    function disableDates(date: DatePickerDate): boolean {
      return props.disabledDates.dates.find((d) => {
        return String(d) === String(toDateString(date))
      })
    }

    function disableDays(date: DatePickerDate): boolean {
      return props.disabledDates.days.find((d) => d === date.day) >= 0
    }

    function disableRanges(date: DatePickerDate) {
      const { ranges } = props.disabledDates

      for (let i = 0; i < ranges.length; i += 1) {
        if (disableFromTo(date, ranges[i])) return true
      }
    }

    function genDateCell(date: DatePickerDate): VNode {
      const isSelected: boolean = compareDates(date, props.value)
      const isToday: boolean = compareDates(date, today)

      date.isHoliday = setDisabled(date)

      const propsData = {
        class: {
          'v-date-picker-dates__cell': !!date.date,
          'v-date-picker-dates__cell--empty': !date.date,
          'v-date-picker-dates__cell--selected':
            isSelected && !props.value.default,
          'v-date-picker-dates__cell--current-date': isToday,
          'v-date-picker-dates__cell--holiday': date.date && date.isHoliday,
        },
        onClick: () => date.date && emit('update:value', date),
      }

      return h('div', propsData, [
        (date.date && slots.date && slots.date(date)) || date.date,
      ])
    }

    function genDateCells(): VNode[] {
      return dates.value.reduce((acc, dateObject) => {
        acc.push(genDateCell(dateObject!))
        return acc
      }, [] as VNode[])
    }

    function genDateRows(): VNode[] {
      const datesVNodes = genDateCells()

      return genTableRows(datesVNodes, 'v-date-picker-dates__row', DAYS.length)
    }

    function genDates(): Nullable<VNode> {
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
