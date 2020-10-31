// Styles
import './VModal.scss'

// Vue API
import { defineComponent, h } from 'vue'

// Effects
import { overlayProps, useOverlay } from '../../effects/use-overlay'
import { transitionProps, useTransition } from '../../effects/use-transition'

// Types
import { VNode } from 'vue'

const modalProps: Record<string, any> = {
  width: {
    type: [String, Number],
    default: 400,
  },
  value: Boolean,
  ...overlayProps(),
  ...transitionProps()
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
    const overlay = props.overlay && (createOverlay() as any) || ''
    const block = h(
      'div',
      {
        class: {
          'v-modal': true,
        }
      }
    )

    let modal = h(block, {}, [content, overlay])

    if (!!props.transition) {
      // @ts-ignore
      modal = useTransition(props, modal)
    }

    // @ts-ignore
    return () => modal()
  },
})
