// Styles
import './VApp.scss'

// Vue API
import { h, defineComponent } from 'vue'

export const VApp = defineComponent({
  name: 'v-app',
  setup(_, { slots }) {
    return () => h('div', {
      class: 'v-app'
    }, slots.default && slots.default())
  }
})
