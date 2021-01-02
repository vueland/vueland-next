// Styles
import './VDataTable.scss'

// Vue API
import { h, ref, provide, computed, defineComponent, renderSlot } from 'vue'

import { VDataTableHeader } from './VDataTableHeader'
import { VDataTableBody } from './VDataTableBody'

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: Array,
    rows: Array,
    itemsPerPage: [String, Number],
    headerColor: String,
    align: String,
    dark: Boolean,
  } as any,

  setup(props, { slots }) {

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    function genTableInner() {
      return h('div', {
        class: {
          'v-data-table__inner': true,
        },
      }, [genTableHeader(), genTableBody()])
    }

    function genTableBody() {
      const rowKeys = Object.keys(props.rows[0])

      return h(VDataTableBody, {
          cols: props.cols,
          rows: props.rows,
          align: props.align,
        },

        rowKeys.reduce((acc, slot) => {
          const slotContent = () => slots[slot] &&
            renderSlot(slots, slot, { row: 'some' })

          if (slotContent()) acc[slot] = slotContent

          return acc
        }, {}))
    }

    function genTableHeader() {
      return h(VDataTableHeader, {
        cols: props.cols,
        color: props.headerColor,
        dark: props.dark,
        align: props.align,
      })
    }

    return () => h('div', {
      class: classes.value,
    }, genTableInner())
  },
})
