// Styles
import './VList.scss'

// Vue API
import {
  h,
  defineComponent,
} from 'vue'

export const VList = defineComponent({
  name: 'v-list',

  setup() {
    return () => h('div')
  },
})