// Styles
import './VDatepickerMonths.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Helpers
import { genTableRows } from './helpers'

const vMonthTableProps: any = {
  lang: {
    type: String,
    default: 'en',
  },
  dark: Boolean,
  month: [String, Number],
  localeMonths: [Array],
}

export const VDatepickerMonths = defineComponent({
  name: 'v-months-table',

  props: vMonthTableProps,

  setup(props, { emit }) {
    const CELLS_IN_ROW = 3

    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const color = props.dark ? 'white' : ''

    const { setTextColor } = useColors()

    const computedMonth = computed({
      get() {
        return +props.month || new Date().getMonth()
      },

      set(val) {
        emit('update:month', val)
      },
    })

    const genDatepickerMonthCell = month => {
      const isSelected = month === computedMonth.value

      return h('div', setTextColor(color, {
        class: {
          'v-months__cell': true,
          'v-moths__cell--selected': isSelected,
        },
        onClick: () => computedMonth.value = month,
      }), props.localeMonths[month])
    }

    const genMothsTableCells = () => {
      return months.map(genDatepickerMonthCell)
    }

    const genMonthRows = () => {
      const monthsVNodes = genMothsTableCells()

      return genTableRows(
        monthsVNodes,
        'v-months__row',
        CELLS_IN_ROW,
      )
    }

    const genMonthsTable = () => {
      return h('div', {
        class: {
          'v-months': true,
        },
      }, genMonthRows())
    }

    return () => genMonthsTable()
  },
})
