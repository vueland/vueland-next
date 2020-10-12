// Styles
import './VModal.scss'

// Vue API
import { defineComponent, h } from 'vue'

// Compositions
// import { useOverlay, overlayProps } from '../../effects/use-overlay'

// Types
// import { Props } from '../../types'

const modalProps = {
  width: {
    type: [String, Number],
    default: 400,
  },
  // ...overlayProps(),
}

export const VModal = defineComponent({
  name: 'v-modal',

  props: modalProps,

  setup(_, { slots }) {
    // const { createOverlay } = useOverlay(props)

    const genContent = () =>
      h(
        'div',
        {
          class: {
            'v-modal__container': true,
          },
        },

        slots.default && slots.default(),
      )

    return () => [
      h(
        'div',
        {
          class: {
            'v-modal': true,
          },
        },

        genContent(),
      ),

      // props.overlay && createOverlay(),
    ]
  },
})
