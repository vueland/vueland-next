// Vue API
import { h, defineComponent } from 'vue'

// Components
import { VTextField } from '../VTextField'

export default defineComponent({
  name: 'v-textarea',

  setup() {
    return () =>
      h(VTextField, {
        tag: 'textarea',
        class: 'v-textarea',
      })
  },
})
