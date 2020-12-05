// Styles
import './VYearsTable.scss'

// VUe API
import { h, ref, defineComponent } from 'vue'

// Components
import { VIcon } from '../VIcon'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Services
import { FaIcons } from '../../services/icons'

// Types
import { VNode } from 'vue'

const vYearsProps = {
  year: [Number, String],
  ...colorProps(),
}

export const VYearsTable = defineComponent({
  name: 'v-years-table',
  props: vYearsProps,

  setup(props) {
    const RANGE = 20
    const YEARS_IN_ROW = 4
    const CURRENT_YEAR = +props.year! || new Date().getFullYear()

    const years = ref([])

    const { setTextColor, setBackground } = useColors()

    const rangeYears = (isForward) => {
      const ind = isForward ? years.value.length - 1 : 0
      const year = years.value[ind] + (!!ind ? 1 : -1)
      const startFrom = year || CURRENT_YEAR

      years.value = []

      for (let i = 0; i < RANGE; i += 1) {
        const res = !!ind ? startFrom + i : startFrom - i
        years.value.push(res as never)
      }

      !isForward && years.value.reverse()
    }

    const genLeftArrow = () => {
      return h('div', {
        class: 'v-years__header-button',
      }, h(VIcon, {
        icon: FaIcons.$arrowLeft,
        clickable: true,
        onClick: () => rangeYears(false),
        size: 18,
      }))
    }

    const genRightArrow = () => {
      return h('div', {
        class: 'v-years__header-button',
      }, h(VIcon, {
        icon: FaIcons.$arrowRight,
        clickable: true,
        onClick: () => rangeYears(true),
        size: 18,
      }))
    }

    const genHeaderCurrentYear = () => {
      return h('div', {
        class: 'v-years__header-display',
      }, CURRENT_YEAR)
    }

    const genYearsTableHeader = () => {
      return h('div', {
        class: 'v-years__header',
      }, [
        genLeftArrow(),
        genHeaderCurrentYear(),
        genRightArrow(),
      ])
    }

    const genYears = (): VNode[] => {
      return years.value.map(year => {
        return h('div', {
          class: 'v-years__cell',
          key: year,
        }, year)
      })
    }

    const genYearsRows = () => {
      const genRow = dateVNodes => {
        return h('div', {
          class: 'v-years__row',
        }, dateVNodes)
      }

      const yearsVNodes: VNode[] = genYears()
      const tableRows: VNode[] = []

      let rowYears: VNode[] = []

      for (let i = 0; i <= yearsVNodes.length; i += 1) {

        if (i && !(i % YEARS_IN_ROW)) {
          tableRows.push(genRow(rowYears))
          rowYears = []
        }

        rowYears.push(yearsVNodes[i])
      }

      return tableRows
    }

    const genYearsTable = () => {
      return h('div', {
        class: 'v-years',
      }, [
        genYearsTableHeader(),
        genYearsRows(),
      ])
    }

    rangeYears(true)

    return () => h(genYearsTable())
  },
})