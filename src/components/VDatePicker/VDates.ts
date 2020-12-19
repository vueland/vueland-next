// Styles
import './VDates.scss'

// Vue API
import { h, ref, inject, computed, watch, defineComponent } from 'vue'

// Helpers
import { genTableRows } from './helpers'

// Types
import { VNode, Ref } from 'vue'
import { DatePickerBtnHandlers } from './VDatepicker'

type Date = {
  date: number | null
  day: number
  isHoliday?: boolean
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

  setup(props, { emit }): () => VNode[] {
    const FIRST_MONTH = 0
    const LAST_MONTH = 11
    const FIRST_DAY = 0
    const LAST_DAY = 6
    const WEEK = [0, 1, 2, 3, 4, 5, 6]

    const currentDate = new Date().getDate()
    const dates = ref<(Date | null)[]>([])
    const handlers = inject('handlers') as Ref<DatePickerBtnHandlers>

    const changeMonth = (isNext) => {
      const params: any = {}
      params.month = props.month + (isNext ? 1 : -1)
      params.month = params.month < FIRST_MONTH ? LAST_MONTH : params.month
      params.month = params.month > LAST_MONTH ? FIRST_MONTH : params.month

      if (isNext && !params.month) {
        params.year = props.year + 1
      }

      if (!isNext && params.month === LAST_MONTH) {
        params.year = props.year - 1
      }

      emit('update:month', params)
    }

    handlers.value = {
      onNext: () => changeMonth(true),
      onPrev: () => changeMonth(false),
    }

    const daysInMonth = computed<number>(() => {
      return new Date(props.year, props.month + 1, 0).getDate()
    })

    const computedDate = computed<number>({
      get() {
        return props.date !== undefined ? +props.date : currentDate
      },
      set(val) {
        !!val && emit('update:date', val)
      },
    })

    const genWeekDays = () => {
      const propsData = {
        class: {
          'v-dates__day': true,
        },
      }

      return WEEK.map(day => {
        return h('span', propsData, props.localeWeek![day] as string)
      })
    }

    const genTableDates = () => {
      dates.value = []

      for (let i = 1; i <= daysInMonth.value; i += 1) {

        const day = new Date(props.year, props.month, i).getDay()
        const isHoliday = !day || !(day % LAST_DAY)
        const date = i

        const dateObject: Date = { date, day, isHoliday }

        if (i === 1) {
          if (dateObject.day === FIRST_DAY) {

            for (let j = FIRST_DAY; j < LAST_DAY; j += 1) {
              dates.value[j] = { date: null } as Date
            }

            dates.value[LAST_DAY] = dateObject
          }

          if (dateObject.day > FIRST_DAY) {

            for (let j = i; j < dateObject.day; j += 1) {
              dates.value[j] = { date: null } as Date
            }

            dates.value[dateObject.day] = dateObject
          }
        } else {
          dates.value[dates.value.length] = dateObject
        }
      }
    }

    watch(() => props.month,
      () => genTableDates(),
      { immediate: true })

    const genDateCell = obj => {
      const isSelected = props.date || obj.date === computedDate.value

      return h('div', {
        class: {
          'v-dates__cell': true,
          'v-dates__cell--selected': isSelected,
          'v-dates__cell--current-date': obj.date === currentDate,
          'v-dates__cell--holiday': obj.isHoliday,
        },
        onClick: () => computedDate.value = obj.date,
      }, obj.date)
    }

    const genDateCells = () => {
      return dates.value.reduce((acc, dateObject) => {
        acc.push(genDateCell(dateObject))
        return acc
      }, [] as any)
    }

    const genDateRows = () => {
      const datesVNodes = genDateCells()

      return genTableRows(
        datesVNodes,
        'v-dates__row',
        WEEK.length,
      )
    }

    const genDatesTable = () => {
      return h('div', {
        class: 'v-dates__dates',
      }, genDateRows())
    }

    const genWeek = () => {
      return h('div', {
        class: 'v-dates__week',
      }, genWeekDays())
    }

    return () => [genWeek(), genDatesTable()]
  },
})
