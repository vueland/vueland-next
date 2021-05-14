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

export const VModal = defineComponent({
  name: 'v-modal',

  props: {
    modelValue: Boolean,
    ...overlayProps(),
    ...transitionProps(),
  } as any,

  emits: ['update:modelValue'],

  setup(props, { slots, emit }) {
    const { isActive } = useToggle(props)

    const modalRef = ref(null)

    onMounted(() => {
      if (props.overlay) {
        const { createOverlay, removeOverlay } = useOverlay(
          props,
          modalRef.value!
        )

        watch(
          () => isActive.value,
          (to) => {
            to && createOverlay()
            !to && removeOverlay()
          }
        )
      }
    })

    function genContent(): VNode {
      const propsData = {
        class: 'v-modal__content',
      }
      return h('div', propsData, slots.default && slots.default())
    }

    function genModal() {
      const propsData = {
        class: 'v-modal',
        ref: modalRef,
        ['onUpdate:modelValue']: (val) => emit('update:modelValue', val),
      }

      return withDirectives(h('div', propsData, genContent()), [
        [vShow, isActive.value],
      ])
    }

    return () => useTransition(genModal(), props.transition)
  },
})
