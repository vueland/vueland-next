// Vue API
import {
  h,
  shallowRef,
  watch,
  withDirectives,
  defineComponent,
  vShow,
  onMounted,
} from 'vue'

// Effects
import { overlayProps, useOverlay } from '../../composables/use-overlay'
import { transitionProps, useTransition } from '../../composables/use-transition'
import { useToggle } from '../../composables/use-toggle'

// Types
import { VNode } from 'vue'
import { convertToUnit } from '../../helpers'

export default defineComponent({
  name: 'v-modal',

  props: {
    modelValue: Boolean,
    zIndex: {
      type: [ Number, String ],
      default: 10,
    },
    width: {
      type: [ Number, String ],
      default: null,
    },
    ...overlayProps(),
    ...transitionProps(),
  } as any,

  emits: [ 'update:modelValue' ],

  setup(props, { slots, emit }) {
    const { isActive } = useToggle(props)
    const modalRef = shallowRef(null)

    onMounted(() => {
      if (props.overlay) {

        const { createOverlay, removeOverlay } = useOverlay(
          props,
          modalRef.value!,
        )

        isActive.value && createOverlay()

        watch(
          () => isActive.value,
          (to) => {
            to && createOverlay()
            !to && removeOverlay()
          },
        )
      }
    })

    const genContent = (): VNode => {
      const propsData = {
        class: 'v-modal__content',
        style: {
          width: props.width ? convertToUnit(props.width) : '',
        },
      }
      return h('div', propsData, slots.default && slots.default())
    }

    const genModal = () => {
      const propsData = {
        class: 'v-modal',
        ref: modalRef,
        ['onUpdate:modelValue']: (val) => emit('update:modelValue', val),
      }

      return withDirectives(
        h('div', propsData, genContent()),
        [ [ vShow, isActive.value ] ]
      )
    }

    return () => useTransition(genModal(), props.transition)
  },
})
