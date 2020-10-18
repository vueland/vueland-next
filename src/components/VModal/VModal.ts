// Styles
import './VModal.scss'

// Vue API
import { defineComponent, h } from 'vue'

// Compositions
import { overlayProps, useOverlay } from '../../effects/use-overlay'

// Types
import { VNode } from 'vue'

const modalProps: Record<string, any> = {
  width: {
    type: [String, Number],
    default: 400,
  },
  ...overlayProps(),
}

export const VModal = defineComponent({
  name: 'v-modal',

  props: modalProps,

  setup(props, { slots }) {
    const { createOverlay } = useOverlay(props)

    const genContent = (): VNode =>
      h(
        'div',
        {
          class: {
            'v-modal__container': true,
          },
        },

        slots.default && slots.default(),
      )

    const content = genContent()

    const block = h(
      'div',
      {
        class: {
          'v-modal': true,
        },
      },
      [],
    )

    const overlay = props.overlay && createOverlay()

    return () => h(block, {}, [content, overlay])
  },
})
