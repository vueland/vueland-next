// Styles
import './VMonthTable.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Services
import { locale } from '../../services/locale'

const vMonthTableProps: any = {
  lang: {
    type: String,
    default: 'eng',
  },
  month: String,
}

export const VMonthTable = defineComponent({
  name: 'v-months-table',

  props: vMonthTableProps,

  setup(props) {
    const CELLS_IN_ROW = 3

    const currentMonth = locale[props.lang].months[new Date().getMonth()]
    const selectedMonth = props.month || currentMonth
    const months = locale[props.lang].months

    const genMothsTableCells = () => {
      return months.map(month => {
        return h('div', {
          class: 'v-months__cell',
        }, month)
      })
    }

    return () => h('div', {}, genMothsTableCells())
  },
})
