// Styles
import './VMonths.scss'

// Vue API
import { h, inject, watch, computed, defineComponent } from 'vue'

// Helpers
import { genTableRows } from './helpers'

// Types
import { VNode } from 'vue'
import { DatePickerBtnHandlers } from '../../types'

export const VMonths = defineComponent({
  name: 'v-months',

  props: {
    lang: {
      type: String,
      default: 'en',
    },
    month: [String, Number],
    year: [String, Number],
    localeMonths: [Array],
  } as any,

  setup(props, { emit }) {
    const CELLS_IN_ROW = 3
    const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const CURRENT_MONTH = new Date().getMonth()

    const handlers: any = inject('handlers') as DatePickerBtnHandlers

    handlers.value = {
      onNext: () => updateYear(true),
      onPrev: () => updateYear(false),
    }

    watch(() => props.month, to => console.log(to))

    const computedMonth = computed<number>({
      get() {
        return props.month !== undefined ? +props.month : CURRENT_MONTH
      },
      set(val) {
        emit('update:month', val)
      },
    })

    function updateYear(isNext: boolean) {
      const year = +props.year + (isNext ? 1 : -1)
      emit('update:year', year)
    }

    function genMonthCell(month): VNode {
      const isSelected = month === computedMonth.value
      const propsData = {
        class: {
          'v-months__cell': true,
          'v-months__cell--selected': isSelected,
          'v-months__cell--current-month': month === CURRENT_MONTH,
        },
        onClick: () => (computedMonth.value = month),
      }

      return h('div', propsData, props.localeMonths[month])
    }

    function genMonthRows(): VNode[] {
      const monthsVNodes = MONTHS.map(genMonthCell)
      return genTableRows(monthsVNodes, 'v-months__row', CELLS_IN_ROW)
    }

    return () => {
      const propsData = {
        class: {
          'v-months': true,
        },
      }

      return h('div', propsData, genMonthRows())
    }
  },
})
