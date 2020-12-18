// Styles
import './VDatepickerYears.scss'

// VUe API
import { h, ref, watchEffect, inject, computed, defineComponent } from 'vue'

// Helpers
import { genTableRows } from './helpers'

// Types
import { VNode } from 'vue'
import { useTransition } from '../../effects/use-transition'

const props: any = {
  year: [Number, String],
}

export const VDatepickerYears = defineComponent({
  name: 'v-years-table',
  props,

  setup(props, { emit }) {
    // constants
    const LIMIT = 100
    const ON_TABLE = 20
    const CELLS_IN_ROW = 4
    const ANIMATION_TIMEOUT = 100
    const CURRENT_YEAR = new Date().getFullYear()

    // reactive
    const years = ref<Array<number[]>>([])
    const onTableIndex = ref<number>(0)
    const isListChanged = ref<boolean>(false)
    const transition = ref<string>('')

    // injects
    const handlers = inject('handlers') as any

    watchEffect(
      () => isListChanged.value &&
        setTimeout(() => {
          isListChanged.value = false
        }, ANIMATION_TIMEOUT),
    )

    // computed values
    const computedYear = computed<number>({
      get() {
        return +props.year! || CURRENT_YEAR
      },
      set(val: number) {
        emit('update:year', val)
      },
    })

    // methods
    const setCurrentTransition = isNext => {
      transition.value = isNext ? 'fade-in-down' : 'fade-in-up'
    }

    const setTableIndex = () => {
      onTableIndex.value = years.value.findIndex(row => {
        return row.find(year => year === computedYear.value)
      })
    }

    const changeYearsList = isNext => {
      const max = years.value.length - 1
      const val = isNext ? 1 : -1

      if (
        (onTableIndex.value === max && val > 0) ||
        (onTableIndex.value === 0 && val < 0)
      ) return

      setCurrentTransition(isNext)

      onTableIndex.value += val
      isListChanged.value = true
    }

    const genTableYears = () => {
      const fromYear = CURRENT_YEAR - LIMIT
      const maxYears = LIMIT * 2

      let yearsList: number[] = []

      for (let i = 0; i <= maxYears; i += 1) {
        if (yearsList.length === ON_TABLE) {
          years.value.push(yearsList)
          yearsList = []
        }
        yearsList.push(fromYear + i)
      }
    }

    const genYearCell = year => {
      const isSelected = year === computedYear.value

      const propsData = {
        class: {
          'v-datepicker-years__cell': true,
          'v-datepicker-years__cell--selected': isSelected,
          'v-datepicker-years__cell--current-year': year === CURRENT_YEAR,
        },
        onClick: () => (computedYear.value = year),
      }

      return h('div', propsData, year)
    }

    const genYearsCells = (range): VNode[] => {
      return range.map(genYearCell)
    }

    const genYearsRows = () => {
      const currentYears = years.value[onTableIndex.value]
      const yearsVNodes = genYearsCells(currentYears)

      return genTableRows(
        yearsVNodes,
        'v-datepicker-years__row',
        CELLS_IN_ROW,
      )
    }

    const genYearsList = (): VNode | boolean => {
      const propsData = {
        class: 'v-datepicker-years__list',
      }
      return (
        !isListChanged.value && h('div', propsData, genYearsRows())
      )
    }

    const genYearsTable = (): VNode => {
      const content = useTransition(
        genYearsList() as VNode,
        transition.value,
      )
      const propsData = {
        class: {
          'v-datepicker-years': true,
        },
      }

      return h('div', propsData, content)
    }

    handlers.value = {
      onNext: () => changeYearsList(true),
      onPrev: () => changeYearsList(false),
    }

    genTableYears()
    setTableIndex()

    return () => genYearsTable()
  },
})
