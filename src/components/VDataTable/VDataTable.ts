// Styles
import './VDataTable.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

import { VDataTableHeader } from './VDataTableHeader'

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {
    cols: Array,
    items: Array,
    itemsPerPage: [String, Number],
    headerColor: String,
    dark: Boolean
  } as any,

  setup(props) {

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    return () => h('div', {
      class: classes.value,
    }, h(VDataTableHeader, {
      cols: props.cols,
      color: props.headerColor,
      dark: props.dark
    }))
  },
})
