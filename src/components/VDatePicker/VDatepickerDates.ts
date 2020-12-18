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
  name: 'v-datepicker-dates',
  props,

  setup(props, { emit }) {
    const MAX_DATE = 31
    const WEEK = [0, 1, 2, 3, 4, 5, 6]
    const CURRENT_DATE = new Date().getDate()

    const daysInMonth = ref(new Date(props.year, props.month, 0).getDate())
    const dates = ref<number[]>([])

    const computedDate = computed<number>({
      get() {
        return +props.date || CURRENT_DATE
      },
      set(val) {
        emit('update:date', val)
      },
    })

    const genWeekDays = () => {
      const propsData = {
        class: {
          'v-datepicker-dates__day': true,
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
          'v-datepicker-dates__cell': true,
          'v-datepicker-dates__cell--selected': isSelected,
          'v-datepicker-dates__cell--current-date': date === CURRENT_DATE,
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
        'v-datepicker-dates__row',
        WEEK.length,
      )
    }

    const genDatesTable = () => {
      return h('div', {
        class: 'v-datepicker-dates__dates',
      }, genDateRows())
    }

    const genWeek = () => {
      return h('div', {
        class: 'v-datepicker-dates__week',
      }, genWeekDays())
    }


    return () => h('div', {}, [genWeek(), genDatesTable()])
  },
})
