// Styles
import './VModal.scss'

// Vue API
import { defineComponent, h, watch, withDirectives, vShow } from 'vue'

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
  show: Boolean,
  ...overlayProps(),
  ...transitionProps()
}

export const VModal = defineComponent({
  name: 'v-modal',

  props: modalProps,

  setup(props, { slots, emit }) {

    if (props.overlay) {
      const overlay = useOverlay(props, '.v-modal')

      watch(() => props.show, (to) => {
        to && overlay.createOverlay()
        !to && overlay.removeOverlay()
      })
    }

    const genContent = (): VNode =>
      h(
        'div',
        {
          class: {
            'v-modal__content': true,
          },
        },
        slots.default && slots.default(),
      )

    const genModal = () =>
      withDirectives(h(
        'div',
        {
          class: {
            'v-modal': true,
          },

          'onUpdate:show': val => emit('update:show', val)
        },
        [content],
        ),
        [vShow, props.show]
      )

    const content = genContent()

    let modal = genModal()

    if (!!props.transition) {
      const createTransition = useTransition(props, modal)
      modal = createTransition()
    }

    return () => h(modal)
  }
})
