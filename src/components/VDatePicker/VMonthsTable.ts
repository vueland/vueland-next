// Styles
import './VMonthsTable.scss'

// Vue API
import { h, ref, defineComponent } from 'vue'

// Services
import { locale } from '../../services/locale'

// Types
import { VNode } from 'vue'

const vMonthTableProps: any = {
  lang: {
    type: String,
    default: 'en',
  },
  month: [String, Number],
}

export const VMonthTable = defineComponent({
  name: 'v-months-table',

  props: vMonthTableProps,

  setup(props, { emit }) {
    const CELLS_IN_ROW = 3
    const currentMonth = ref(+props.month || new Date().getMonth())
    const months = locale[props.lang].months

    const selectMonth = (month) => {
      currentMonth.value = month
      emit('update:month', month)
    }

    const genMothsTableCells = () => {
      return months.map((month, i) => {
        return h('div', {
          class: {
            'v-months__cell':true,
            'v-moths__cell--selected': i === currentMonth
          },
          onClick: () => selectMonth(i)
        }, month)
      })
    }

    const genMonthRows = () => {
      const monthsVNodes = genMothsTableCells()
      const monthsTableRows: VNode[] = []

      const genTableRow = monthsVNodes => {
        return h('div', {
          class: 'v-months__row',
        }, monthsVNodes)
      }

      let rowMonths: VNode[] = []

      for (let i = 0; i <= monthsVNodes.length; i += 1) {
        if (i && !(i % CELLS_IN_ROW)) {
          monthsTableRows.push(genTableRow(rowMonths))
          rowMonths = []
        }

        rowMonths.push(monthsVNodes[i])
      }

      return monthsTableRows
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
