// Styles
import './VYearsTable.scss'

// VUe API
import { h, ref, defineComponent } from 'vue'

// Components
import { VIcon } from '../VIcon'

// Effects
import { useColors } from '../../effects/use-colors'

// Services
import { FaIcons } from '../../services/icons'

// Types
import { VNode } from 'vue'

const vYearsProps: any = {
  year: [Number, String],
  dark: Boolean,
  color: {
    type: String,
    default: 'white',
  },
}

export const VYearsTable = defineComponent({
  name: 'v-years-table',
  props: vYearsProps,

  setup(props, { emit }) {
    const RANGE = 20
    const CELLS_IN_ROW = 4

    const currentYear = ref(+props.year! || new Date().getFullYear())
    const color = props.dark ? 'white' : ''
    const years = ref([])

    const { setTextColor, setBackground } = useColors()

    const rangeYears = (isForward) => {
      const ind = isForward ?
        years.value.length - 1 : 0

      const year = years.value[ind] + (!!ind ? 1 : -1)
      const startFrom = year || currentYear.value

      years.value = []

      for (let i = 0; i < RANGE; i += 1) {
        const res = !!ind ?
          startFrom + i :
          startFrom - i

        years.value.push(res as never)
      }

      !isForward && years.value.reverse()
    }

    const selectYear = (year) => {
      currentYear.value = year
      emit('update:year', year)
    }

    const genArrowButton = (isRight) => {
      const icon = isRight ?
        FaIcons.$arrowRight :
        FaIcons.$arrowLeft

      const arrowBtn = h(VIcon,
        setTextColor(color as string, {
          icon,
          clickable: true,
          onClick: () => rangeYears(isRight),
          size: 18,
        }),
      )

      return h('div', {
        class: 'v-years__header-button',
      }, arrowBtn)
    }

    const genHeaderCurrentYear = () => {
      return h('div', setTextColor(color, {
        class: {
          'v-years__header-display': true,
        },
      }), currentYear.value)
    }

    const genYearsTableHeader = () => {
      return h('div', {
        class: 'v-years__header',
      }, [
        genArrowButton(false),
        genHeaderCurrentYear(),
        genArrowButton(true),
      ])
    }

    const genYearTableCells = (): VNode[] => {
      return years.value.map(year => {
        return h('div', setTextColor(color, {
          class: {
            'v-years__cell': true,
            'v-years__cell--selected': year === currentYear.value,
          },
          onClick: () => selectYear(year),
          key: year,
        }), year)
      })
    }

    const genYearTableRows = () => {
      const yearsVNodes: VNode[] = genYearTableCells()
      const yearTableRows: VNode[] = []

      const genTableRow = dateVNodes => {
        return h('div', {
          class: 'v-years__row',
        }, dateVNodes)
      }

      let rowYears: VNode[] = []

      for (let i = 0; i <= yearsVNodes.length; i += 1) {

        if (i && !(i % CELLS_IN_ROW)) {
          yearTableRows.push(genTableRow(rowYears))
          rowYears = []
        }

        rowYears.push(yearsVNodes[i])
      }

      return yearTableRows
    }

    const genYearsTable = () => {
      return h('div',
        setBackground(props.color, {
          class: {
            'v-years': true,
          },
        }),
        [
          genYearsTableHeader(),
          genYearTableRows(),
        ],
      )
    }

    rangeYears(true)

    return () => h(genYearsTable())
  },
})
