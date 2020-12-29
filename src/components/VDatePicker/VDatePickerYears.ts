// Styles
import './VDatePickerYears.scss'

// VUe API
import { h, ref, watchEffect, inject, computed, defineComponent } from 'vue'

// Helpers
import { genTableRows } from './helpers'

// Types
import { VNode, Ref } from 'vue'
import { DatePickerBtnHandlers } from '../../types'

// Effects
import { useTransition } from '../../effects/use-transition'

export const VDatePickerYears = defineComponent({
  name: 'v-years',
  props: {
    year: [Number, String],
  } as any,

  setup(props, { emit }) {
    const LIMIT = 100
    const ON_TABLE = 20
    const CELLS_IN_ROW = 4
    const CURRENT_YEAR = new Date().getFullYear()
    const ANIMATION_TIMEOUT = 100

    const years = ref<Array<number[]>>([])
    const onTableIndex = ref<number>(0)
    const isListChanged = ref<boolean>(false)
    const transition = ref<string>('')

    const handlers = inject('handlers') as Ref<DatePickerBtnHandlers>

    watchEffect(
      () => isListChanged.value &&
        setTimeout(() => {
          isListChanged.value = false
        }, ANIMATION_TIMEOUT),
    )

    const computedYear = computed<number>({
      get() {
        return +props.year! || CURRENT_YEAR
      },
      set(val: number) {
        emit('update:year', val)
      },
    })

    if (handlers?.value) {
      handlers.value = {
        onNext: () => changeYearsList(true),
        onPrev: () => changeYearsList(false),
      }
    }

    function setCurrentTransition(isNext) {
      transition.value = isNext ? 'fade-in-down' : 'fade-in-up'
    }

    function setTableIndex() {
      onTableIndex.value = years.value.findIndex(row => {
        return row.find(year => year === computedYear.value)
      })
    }

    function changeYearsList(isNext) {
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

    function genTableYears() {
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

    function genYearCell(year): VNode {
      const isSelected = year === computedYear.value
      const propsData = {
        class: {
          'v-years__cell': true,
          'v-years__cell--selected': isSelected,
          'v-years__cell--current-year': year === CURRENT_YEAR,
        },
        onClick: () => (computedYear.value = year),
      }

      return h('div', propsData, year)
    }

    function genYearsRows(): VNode[] {
      const currentYears = years.value[onTableIndex.value]
      const yearsVNodes = currentYears.map(genYearCell)

      return genTableRows(
        yearsVNodes,
        'v-years__row',
        CELLS_IN_ROW,
      )
    }

    function genYears(): VNode | null {
      const propsData = {
        class: 'v-years__years',
      }
      return (
        !isListChanged.value && h('div', propsData, genYearsRows()) || null
      )
    }

    genTableYears()
    setTableIndex()

    return () => {
      const content = useTransition(
        genYears() as VNode,
        transition.value,
      )
      const propsData = {
        class: {
          'v-years': true,
        },
      }

      return h('div', propsData, content)
    }
  },
})
