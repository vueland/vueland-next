// Styles
import './VDates.scss'

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
  month?: number
  year?: number
}

const props: any = {
  localeWeek: Array,
  year: [String, Number],
  month: [String, Number],
  date: [String, Number],
  value: Object,
}

export const VDates = defineComponent({
  name: 'v-dates',
  props,

  setup(props, { emit }): () => VNode {
    const FIRST_MONTH = 0
    const LAST_MONTH = 11
    const WEEK = [1, 2, 3, 4, 5, 6, 0]
    const ANIMATION_TIMEOUT = 100
    const TODAY = parseDate(new Date())

    const dates = ref<(Date | null)[]>([])
    const isDatesChanged = ref<boolean>(false)

    const handlers = inject('handlers') as Ref<DatePickerBtnHandlers>

    handlers.value = {
      onNext: () => updateMonth(true),
      onPrev: () => updateMonth(false),
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
      () => setTimeout(() => {
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
        class: {
          'v-dates__day': true,
        },
      }

      return WEEK.map(day => {
        return h('span', propsData, props.localeWeek![day] as string)
      })
    }

    function genDateObject(date): DatePickerDate {
      const { year, month } = props
      return parseDate(new Date(year, month, date))
    }

    function setEmptiesBeforeFirstDate(dateObject) {
      const firstDay = WEEK[0]

      const startDay = firstDay && !dateObject.day ?
        dateObject.day : firstDay

      const tillDay = firstDay && !dateObject.day ?
        WEEK.length - 1 : dateObject.day

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

    function genDateCell(obj): VNode {
      const propsData = {
        class: {
          'v-dates__cell': !!obj.date,
          'v-dates__cell--empty': !obj.date,
          'v-dates__cell--selected': compareDates(obj, props.value),
          'v-dates__cell--current-date': compareDates(obj, TODAY),
          'v-dates__cell--holiday': obj.isHoliday,
        },
        onClick: () => emit('update:value', obj),
      }

      return h('div', propsData, obj.date)
    }

    function genDateCells(): VNode[] {
      return dates.value.reduce((acc, dateObject) => {
        acc.push(genDateCell(dateObject))
        return acc
      }, [] as any)
    }

    function genDateRows(): VNode[] {
      const datesVNodes = genDateCells()
      return genTableRows(datesVNodes, 'v-dates__row', WEEK.length)
    }

    function genDates(): VNode | null {
      return (
        (!isDatesChanged.value &&
          h('div', { class: 'v-dates__dates' }, genDateRows())) || null
      )
    }

    function genWeek(): VNode {
      return h('div', { class: 'v-dates__week' }, genWeekDays())
    }

    return () =>
      h('div', { class: 'v-dates' }, [
        genWeek(),
        useTransition(genDates() as any, 'fade'),
      ])
  },
})
