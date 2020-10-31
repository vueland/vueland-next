// Styles
import './VModal.scss'

// Vue API
import { defineComponent, h } from 'vue'

// Effects
import { overlayProps, useOverlay } from '../../effects/use-overlay'
import { transitionProps, useTransition } from '../../effects/use-transition'
import { teleportProps, useTeleport } from '../../effects/use-teleport'

// Types
import { VNode } from 'vue'

const modalProps: Record<string, any> = {
  width: {
    type: [String, Number],
    default: 400,
  },
  value: Boolean,
  ...overlayProps(),
  ...transitionProps(),
  ...teleportProps(),
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

    let modal = h(
      'div',
      {
        class: {
          'v-modal': true,
        }
      },
      [content, overlay],
    )

    if (!!props.transition) {
      const createTransition = useTransition(props, modal)
      modal = createTransition()
    }

    if (!!props.portTo) {
      return () => useTeleport(props, modal)
    }

    return () => modal
  },
})
