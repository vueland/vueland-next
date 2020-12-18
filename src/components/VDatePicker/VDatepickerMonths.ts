// Styles
import './VDatepickerMonths.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Helpers
import { genTableRows } from './helpers'

const props: any = {
  lang: {
    type: String,
    default: 'en',
  },
  month: [String, Number],
  localeMonths: [Array],
}

export const VDatepickerMonths = defineComponent({
  name: 'v-datepicker-months',

  props,

  setup(props, { emit }) {
    const CELLS_IN_ROW = 3
    const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    const currentMonth = new Date().getMonth()

    const computedMonth = computed({
      get() {
        return props.month !== undefined ? +props.month : currentMonth
      },

      set(val) {
        emit('update:month', val)
      },
    })

    const genMonthCell = month => {
      const isSelected = month === computedMonth.value

      return h('div', {
        class: {
          'v-datepicker-months__cell': true,
          'v-datepicker-months__cell--selected': isSelected,
        },
        onClick: () => computedMonth.value = month,
      }, props.localeMonths[month])
    }

    const genMothsTableCells = () => {
      return MONTHS.map(genMonthCell)
    }

    const genMonthRows = () => {
      const monthsVNodes = genMothsTableCells()

      return genTableRows(
        monthsVNodes,
        'v-datepicker-months__row',
        CELLS_IN_ROW,
      )
    }

    const genMonthsTable = () => {
      return h('div', {
        class: {
          'v-datepicker-months': true,
        },
      }, genMonthRows())
    }

    return () => genMonthsTable()
  },
})
