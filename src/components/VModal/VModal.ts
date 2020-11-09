// Styles
import './VModal.scss'

// Vue API
import { defineComponent, h, watch, withDirectives, vShow } from 'vue'

// Effects
import { overlayProps, useOverlay } from '../../effects/use-overlay'
import { transitionProps, useTransition } from '../../effects/use-transition'
import { useToggle } from '@/effects/use-toggle'

// Types
import { VNode } from 'vue'

const vModalProps: Record<string, any> = {
  width: {
    type: [String, Number],
    default: 400,
  },
  modelValue: Boolean,
  ...overlayProps(),
  ...transitionProps(),
}

export const VModal = defineComponent({
  name: 'v-modal',

  props: vModalProps,

  setup(props, { slots, emit }) {
    const { isActive } = useToggle(props, 'modelValue')

    if (props.overlay) {
      const overlay = useOverlay(props, 'v-modal')

      watch(
        () => isActive.value,
        to => {
          to && overlay.createOverlay()
          !to && overlay.removeOverlay()
        },
      )
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
          'onUpdate:modelValue': val => emit('update:modelValue', val),
        },
        [content],
      )

    const content = genContent()

    const modal = !!props.transition ? useTransition(props, genModal()) : genModal()

    return () => withDirectives(h(modal), [[vShow, isActive.value]])
  },
})
