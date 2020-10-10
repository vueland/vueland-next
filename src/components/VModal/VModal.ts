// Styles
import './VModal.scss'

// Vue API
import { defineComponent } from 'vue'

const modalProps = {
  width: {
    type: [String, Number],
    default: 400,
  },
}

export const VModal = defineComponent({
  name: 'v-modal',
  props: modalProps,
})
