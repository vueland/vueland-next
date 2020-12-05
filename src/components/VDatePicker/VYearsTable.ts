import './VYearsTable.scss'

import { h, ref, defineComponent } from 'vue'

import { VIcon } from '../VIcon'

import { FaIcons } from '../../services/icons'

const vYearsProps = {
  year: [Number, String],
}

export const VYearsTable = defineComponent({
  name: 'v-years-table',
  props: vYearsProps,

  setup(props) {
    const RANGE = 20
    const YEARS_IN_ROW = 4
    const CURRENT_YEAR = +props.year! || new Date().getFullYear()

    const years = ref([])

    const rangeYearsPlus = () => {
      const lastYear = years.value[years.value.length - 1]
      const startFrom = lastYear ? lastYear : CURRENT_YEAR

      years.value = []

      for (let i = 0; i < RANGE; i += 1) {
        years.value.push((startFrom + i) as never)
      }

      console.log(years.value)
    }

    const rangeYarsMinus = () => {
      const lastYear = years.value[0]
      const startFrom = lastYear ? lastYear : CURRENT_YEAR

      years.value = []

      for (let i = 0; i < RANGE; i += 1) {
        years.value.push(startFrom - i as never)
      }

      console.log(years.value.reverse())
    }

    rangeYearsPlus()

    const genLeftArrow = () => {
      return h('div', {
        class: 'v-years__header-button',
      }, h(VIcon, {
        icon: FaIcons.$arrowLeft,
        clickable: true,
        onClick: rangeYarsMinus,
        size: 18,
      }))
    }


    const genRightArrow = () => {
      return h('div', {
        class: 'v-years__header-button',
      }, h(VIcon, {
        icon: FaIcons.$arrowRight,
        clickable: true,
        onClick: rangeYearsPlus,
        size: 18,
      }))
    }

    const genHeaderCurrentYear = () => {
      return h('div', {
        class: 'v-years__header-current-year',
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

    const genYearsRow = (dates) => {
      return h('div', {
        class: 'v-years__row',
      }, dates)
    }

    const genYears = () => {
      return years.value.map(year => {
        return h('div', {
          class: 'v-years__year',
          key: year,
        }, year)
      })
    }

    const genYearsTable = () => {
      const yearsVNodes = genYears()
      const tableRows = []

      let rowYears = []

      for (let i = 0; i <= yearsVNodes.length; i += 1) {

        if (i && !(i % YEARS_IN_ROW)) {
          tableRows.push(genYearsRow(rowYears) as never)
          rowYears = []
        }

        rowYears.push(yearsVNodes[i] as never)
      }

      return h ('div', {
        class: 'v-years'
      }, [
        genYearsTableHeader(),
        tableRows
      ])
    }

    return () => h(genYearsTable())
  },
})