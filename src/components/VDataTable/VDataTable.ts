// Styles
import './VDataTable.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

import { VDataTableHeader } from './VDataTableHeader'

export const VDataTable = defineComponent({
  name: 'v-data-table',
  props: {},

  setup() {

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table': true,
    }))

    return () => h('div', {
      class: classes.value,
    }, h(VDataTableHeader, {}))
  },
})
