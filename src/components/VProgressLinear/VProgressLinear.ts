import './VProgressLinear.scss'

import { h, defineComponent } from 'vue'

export const VProgressLinear = defineComponent({
  name: 'v-progress-linear',
  props: {},
  setup() {
    function genProgressBuffer() {
      return h('div', {
        class: 'v-progress-linear__buffer',
      })
    }

    function genProgressLinear() {
      return h('div', {
        class: 'v-progress-linear',
      })
    }

    return () => h('div', {})
  },
})
