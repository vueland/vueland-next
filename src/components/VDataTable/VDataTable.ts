// Styles
import './VDataTable.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VDataTableHeader } from './VDataTableHeader'
import { VDataTableBody } from './VDataTableBody'
import { VDataTableFooter } from './VDataTableFooter'

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: Array,
    rows: Array,
    itemsPerPage: [String, Number],
    headerColor: String,
    align: String,
    dark: Boolean,
    numbered: Boolean,
    color: {
      type: String,
      default: 'white',
    },
  } as any,

  setup(props, { slots }) {
    const { setBackground } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    function genTableBody() {
      const rowKeys = props.cols.map(col => col.key)

      return h(VDataTableBody, {
          cols: props.cols,
          rows: props.rows,
          align: props.align,
          dark: props.dark,
          numbered: props.numbered,
        },

        rowKeys.reduce((acc, slot) => {
          const slotContent = (row = {}) => {
            return slots[slot] && slots[slot]!({ row })
          }

          if (slotContent()) acc[slot] = slotContent

          return acc
        }, {}))
    }

    function genTableHeader() {
      return h(VDataTableHeader, {
        cols: props.cols,
        color: props.headerColor || props.color,
        dark: props.dark,
        align: props.align,
        numbered: props.numbered,
      })
    }

    function genTableFooter() {
      return h(VDataTableFooter, {})
    }

    function genTableInner() {
      return h('div', {
        class: {
          'v-data-table__inner': true,
        },
      }, [
        genTableHeader(),
        genTableBody(),

      ])
    }

    return () => {
      const propsData = {
        class: classes.value,
      }

      return h('div',
        setBackground(props.color, propsData),
        [genTableInner(),
        genTableFooter()]
      )
    }
  },
})
