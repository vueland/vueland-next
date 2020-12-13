// Styles
import './VModal.scss'

// Vue API
import {
  h,
  ref,
  watch,
  withDirectives,
  defineComponent,
  vShow,
  onMounted,
} from 'vue'

// Effects
import { overlayProps, useOverlay } from '../../effects/use-overlay'
import { transitionProps, useTransition } from '../../effects/use-transition'
import { useToggle } from '../../effects/use-toggle'

// Types
import { VNode } from 'vue'

const vModalProps: Record<string, any> = {
  modelValue: Boolean,
  ...overlayProps(),
  ...transitionProps(),
}

export const VModal = defineComponent({
  name: 'v-modal',

  props: vModalProps,

  setup(props, { slots, emit }) {
    const { isActive } = useToggle(props)

    const modalRef = ref(null)

    onMounted(() => {
      if (props.overlay) {
        const { createOverlay, removeOverlay } = useOverlay(
          props,
          modalRef.value!,
        )

        isActive.value && createOverlay()

        watch(
          () => isActive.value,
          to => {
            to && createOverlay()
            !to && removeOverlay()
          },
        )
      }
    })

    const genContent = (): VNode => {
      const propsData = {
        class: 'v-modal__content',
      }
      return h('div', propsData, slots.default && slots.default())
    }

    const genModal = () => {
      const propsData = {
        class: 'v-modal',
        ref: modalRef,
        'onUpdate:modelValue': val => emit('update:modelValue', val),
      }

      return withDirectives(h('div', propsData, genContent()), [
        [vShow, isActive.value],
      ])
    }

    return () => {
      return useTransition(props, genModal())
    }
  },
})
