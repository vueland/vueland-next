// Styles
import './VDataTableFooter.scss'

// Vue API
import { h, defineComponent } from 'vue'

export const VDataTableFooter = defineComponent({
  name: 'v-data-table-footer',
  props: {} as any,

  setup() {
    return () => h('div', {
      class: 'v-data-table__footer',
    })
  },
})
