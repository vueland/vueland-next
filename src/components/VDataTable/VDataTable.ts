// Styles
import './VDataTable.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

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

  setup(props) {

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    function genTableBody() {
      return h(VDataTableBody, {
        cols: props.cols,
        rows: props.rows,
        align: props.align
      })
    }

    function genTableHeader() {
      return h(VDataTableHeader, {
        cols: props.cols,
        color: props.headerColor,
        dark: props.dark,
        align: props.align
      })
    }

    return () => h('div', {
      class: classes.value,
    }, [
      genTableHeader(),
      genTableBody(),
    ])
  },
})
