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
  locale: [Array]
}

export const VDatepickerMonths = defineComponent({
  name: 'v-months-table',

  props: vMonthTableProps,

  setup(props, { emit }) {
    const CELLS_IN_ROW = 3
    const months = props.locale

    const { setTextColor } = useColors()

    const currentMonth = computed({
      get() {
        return +props.month || new Date().getMonth()
      },

      set(val) {
        emit('update:month', val)
      },
    })

    const selectMonth = (month) => {
      currentMonth.value = month
      emit('update:month', month)
    }

    const genMothsTableCells = () => {
      const color = props.dark ? 'white' : ''
      return months.map((month, i) => {
        return h('div', setTextColor(color, {
          class: {
            'v-months__cell': true,
            'v-moths__cell--selected': i === currentMonth.value,
          },
          onClick: () => selectMonth(i),
        }), month)

      })
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
