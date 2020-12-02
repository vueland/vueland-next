// Styles
import './VTextarea.scss'

// Vue API
import { h, defineComponent } from 'vue'

// Components
import { VTextField } from '../VTextField'

export const VTextarea = defineComponent({
  name: 'v-textarea',

  setup() {
    return () => h(VTextField, {
      tag: 'textarea',
      class: 'v-textarea'
    })
  },
})