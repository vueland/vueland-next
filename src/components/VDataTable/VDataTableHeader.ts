// Styles
import './VDataTableHeader.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'


export const VDataTableHeader = defineComponent({
  name: 'v-data-table-header',
  props: {} as any,

  setup() {

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table-header': true,
    }))

    return () => h('div', {
      class: classes.value,
    })
  },
})
