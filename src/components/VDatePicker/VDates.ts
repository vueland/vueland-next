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
  year: number
  month: number
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

    const updateMonth = isNext => {
      const params: any = {}

      params.month = props.month + (isNext ? 1 : -1)

      if (!isNext && params.month! < FIRST_MONTH) {
        params.month = LAST_MONTH
      }

      if (isNext && params.month > LAST_MONTH) {
        params.month = FIRST_MONTH
      }

      if (isNext && !params.month) {
        params.year = props.year + 1
      }

      if (!isNext && params.month === LAST_MONTH) {
        params.year = props.year - 1
      }

      emit('update:month', params)
    }

    handlers.value = {
      onNext: () => updateMonth(true),
      onPrev: () => updateMonth(false),
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

    const genDateObject = (date): Date => {
      const { year, month } = props
      const day = new Date(year, month, date).getDay()
      const isHoliday = !day || !(day % LAST_DAY)

      return { year, month, date, day, isHoliday }
    }

    const genTableDates = () => {
      dates.value = []

      for (let i = 1; i <= daysInMonth.value; i += 1) {
        const dateObject = genDateObject(i)

        if (i === 1) {
          const tillDay = dateObject.day || LAST_DAY
          const startDay = dateObject.day ? i : FIRST_DAY

          for (let j = startDay; j < tillDay; j += i) {
            dates.value[j] = { date: null } as Date
          }

          dates.value[tillDay] = dateObject
        } else {
          dates.value[dates.value.length] = dateObject
        }
      }
    }

    watch(
      () => props.month,
      () => genTableDates(),
      { immediate: true },
    )

    const genDateCell = obj => {
      const isSelected = props.date || obj.date === computedDate.value

      return h('div', {
          class: {
            'v-dates__cell': true,
            'v-dates__cell--selected': isSelected,
            'v-dates__cell--current-date': obj.date === currentDate,
            'v-dates__cell--holiday': obj.isHoliday,
          },
          onClick: () => (computedDate.value = obj.date),
        },
        obj.date,
      )
    }

    const genDateCells = () => {
      return dates.value.reduce((acc, dateObject) => {
        acc.push(genDateCell(dateObject))
        return acc
      }, [] as any)
    }

    const genDateRows = () => {
      const datesVNodes = genDateCells()
      return genTableRows(datesVNodes, 'v-dates__row', WEEK.length)
    }

    const genDatesTable = () => {
      return h('div', { class: 'v-dates__dates' }, genDateRows())
    }

    const genWeek = () => {
      return h('div', { class: 'v-dates__week' }, genWeekDays())
    }

    return () => [genWeek(), genDatesTable()]
  },
})
