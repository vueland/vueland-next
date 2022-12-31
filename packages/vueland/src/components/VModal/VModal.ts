// Vue API
import {
  h,
  shallowRef,
  defineComponent,
  onMounted,
  unref,
  vShow,
  watch,
  withDirectives,
} from 'vue'

// Effects
import { overlayProps, useOverlay } from '../../composables/use-overlay'
import { transitionProps, useTransition } from '../../composables/use-transition'
import { useToggle } from '../../composables/use-toggle'

// Types
import { VNode } from 'vue'
import { convertToUnit } from '../../helpers'

// Directives
import { clickOutside } from '../../directives'


export default defineComponent({
  name: 'v-modal',
  directives: {
    clickOutside,
  },
  props: {
    modelValue: Boolean,
    zIndex: {
      type: [Number, String],
      default: 10,
    },
    width: {
      type: [Number, String],
      default: null,
    },
    closeOnClick: {
      type: Boolean,
      default: false,
    },
    ...overlayProps(),
    ...transitionProps(),
  },

  emits: ['update:modelValue'],

  setup(props, { slots, emit }) {
    const { isActive } = useToggle(props)
    const modalRef = shallowRef(null)

    onMounted(() => {
      if (props.overlay) {

        const { createOverlay, removeOverlay } = useOverlay(
          props,
          unref(modalRef)!,
        )

        unref(isActive) && createOverlay()

        watch(isActive, (state) => {
            state && createOverlay()
            !state && removeOverlay()
          },
        )
      }
    })

    const genContent = (): VNode => {
      const vNode = h('div', {
        class: 'v-modal__content',
        style: {
          width: props.width ? convertToUnit(props.width) : '',
        },
      }, slots.default?.())

      return props.closeOnClick ? withDirectives(vNode, [
        [clickOutside, () => {
          isActive.value = false
          emit('update:modelValue', unref(isActive))
        }],
      ]) : vNode
    }

    const genModal = () => {
      const propsData = {
        class: 'v-modal',
        ref: modalRef,
        ['onUpdate:modelValue']: (val) => emit('update:modelValue', val),
      }

      return withDirectives(
        h('div', propsData, genContent()),
        [
          [vShow, unref(isActive)],
        ],
      )
    }

    return () => useTransition(genModal(), props.transition!)
  },
})
