// Styles
import './VDatepickerDates.scss'

// Vue API
import { h, ref, computed, watch, defineComponent } from 'vue'

// Helpers
import { genTableRows } from './helpers'

const props: any = {
  localeWeek: Array,
  year: [String, Number],
  month: [String, Number],
  date: [String, Number],
}

export const VDatepickerDates = defineComponent({
  name: 'v-dates',
  props,

  setup(props, { emit }) {
    const MAX_DATE = 31
    const WEEK = [0, 1, 2, 3, 4, 5, 6]
    const CURRENT_DATE = new Date().getDate()

    const daysInMonth = ref(new Date(props.year, props.month, 0).getDate())
    const dates = ref<number[]>([])

    const computedDate = computed<number>({
      get() {
        return props.date !== undefined ? +props.date : CURRENT_DATE
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
      let day: number | null = null

      for (let i = 0; i <= daysInMonth.value; i += 1) {
        if (day === null) {
          day = new Date(props.year, props.month, i).getDay()

          for (let j = 0; j < day; j += 1) {
            dates.value.push(null as any)
          }

          dates.value[day] = i
        }

        if ((i + 1) <= MAX_DATE) {
          dates.value[day + i] = i + 1
        }
      }
    }

    watch(() => props.month,
      to => to && genTableDates(),
      { immediate: true })

    const genDateCell = date => {
      const isSelected = props.date || date === computedDate.value

      return h('div', {
        class: {
          'v-dates__cell': true,
          'v-dates__cell--selected': isSelected,
          'v-dates__cell--current-date': date === CURRENT_DATE,
          'v-dates__cell--holiday': false
        },
        onClick: () => computedDate.value = date,
      }, date)
    }

    const genDateCells = () => {
      return dates.value.reduce((acc, date) => {
        acc.push(genDateCell(date))
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

    return () => h('div', {}, [genWeek(), genDatesTable()])
  },
})
