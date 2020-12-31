// Styles
import './VDataTableCell.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

export const VDataTableCell = defineComponent({
  name: 'v-data-table-cell',
  props: {} as any,

  setup() {

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table-header': true,
    }))

    return h('div', {
      class: classes.value,
    })
  },
})
