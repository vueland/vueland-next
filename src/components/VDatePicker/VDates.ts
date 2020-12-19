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
import { DatePickerBtnHandlers } from '../../types'

type Date = {
  year: number
  month: number
  date: number | null
  day: number
  isHoliday?: boolean
}

type UpdateParams = {
  month?: number
  year?: number
}

const props: any = {
  localeWeek: Array,
  year: [String, Number],
  month: [String, Number],
  date: [String, Number],
}

export const VDates = defineComponent({
  name: 'v-dates',
  props,

  setup(props, { emit }): () => VNode {
    const FIRST_MONTH = 0
    const LAST_MONTH = 11
    const FIRST_DAY = 0
    const LAST_DAY = 6
    const WEEK = [0, 1, 2, 3, 4, 5, 6]
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

    const computedDate = computed<number>({
      get() {
        return props.date !== undefined ? +props.date : TODAY.date
      },
      set(val) {
        !!val && emit('update:date', val)
      },
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

      if (!isNext && params.month! < FIRST_MONTH) {
        params.month = LAST_MONTH
      }

      if (isNext && params.month! > LAST_MONTH) {
        params.month = FIRST_MONTH
      }

      if (isNext && !params.month) {
        params.year = props.year + 1
      }

      if (!isNext && params.month === LAST_MONTH) {
        params.year = props.year - 1
      }

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

    function genDateObject(date): Date {
      const { year, month } = props
      const day = new Date(year, month, date).getDay()
      const isHoliday = !day || !(day % LAST_DAY)

      return { year, month, date, day, isHoliday }
    }

    function setEmptiesBeforeFirstDate(dateObject) {
      const tillDay = dateObject.day || LAST_DAY
      const startDay = dateObject.day ? 1 : FIRST_DAY

      for (let j = startDay; j < tillDay; j += 1) {
        dates.value[j] = { date: null } as Date
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
          dates.value[dates.value.length] = dateObject
        }
      }
    }

    function compareWithCurrentDate(obj) {
      return obj.date === TODAY.date &&
        obj.month === TODAY.month &&
        obj.year === TODAY.year
    }

    function genDateCell(obj): VNode {
      const propsData = {
        class: {
          'v-dates__cell': true,
          'v-dates__cell--selected': obj.date === computedDate.value,
          'v-dates__cell--current-date': compareWithCurrentDate(obj),
          'v-dates__cell--holiday': obj.isHoliday,
        },
        onClick: () => (computedDate.value = obj.date),
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
