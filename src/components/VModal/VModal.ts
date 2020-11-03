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
  modelValue: Boolean,
  show: Boolean,
  ...overlayProps(),
  ...transitionProps()
}

export const VModal = defineComponent({
  name: 'v-modal',

  props: modalProps,

  setup(props, { slots, emit }) {

    if (props.overlay) {
      const overlay = useOverlay(props, 'v-modal')

      watch(() => props.modelValue, (to) => {
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
      h(
        'div',
        {
          class: {
            'v-modal': true,
          },
          'onUpdate:modelValue': val => emit('update:modelValue', val)
        },
        [content],
      )

    const content = genContent()

    let modal = genModal()

    if (!!props.transition) {
      const transitionedModal = useTransition(props, modal)
      modal = transitionedModal()
    }

    return () => withDirectives(h(modal), [[vShow, props.modelValue]])
  }
})
