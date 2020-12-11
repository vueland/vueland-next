// Styles
import './VModal.scss'

// Vue API
import {
  h,
  ref,
  watch,
  computed,
  withDirectives,
  defineComponent,
  vShow
} from 'vue'

// Effects
import { useTransition } from '../../effects/use-transition'
import { useToggle } from '../../effects/use-toggle'

// Types
import { VNode } from 'vue'
import { Props } from '../../types'

// Components
import { VOverlay } from '../VOverlay'

const vModalProps: Props = {
  width: {
    type: [String, Number],
    default: 400,
  },
  transition: {
    type: String,
    default: 'fade',
  },
  overlay: Boolean,
  overlayColor: {
    type: String,
    default: '#000000',
  },
  modelValue: Boolean,
}

export const VModal = defineComponent({
  name: 'v-modal',

  props: vModalProps,

  setup(props, { slots }) {
    const { isActive } = useToggle(props)

    const overlayState = ref(false)

    const overlayTimeout = computed<number>(() => {
      return isActive.value ? 100 : 200
    })

    const isTimeToToggleOverlay = computed(() => {
      if (isActive.value) return overlayState.value
      return isActive.value
    })

    if (props.overlay) {
      overlayState.value = isActive.value

      watch(() => isActive.value, (to) => {
        setTimeout(() => overlayState.value = to, overlayTimeout.value)
      })
    }

    const genOverlay = () => {
      const overlay = withDirectives(
        h(VOverlay, {
          active: isTimeToToggleOverlay.value,
          hide: !isTimeToToggleOverlay.value,
          color: props.overlayColor,
        }),
        [[vShow, (isActive.value || overlayState.value)]],
      )

      return useTransition({ transition: 'fade' }, overlay)
    }

    const genContent = (): VNode => {
      const content = withDirectives(h(
        'div',
        {
          class: 'v-modal',
        },
        slots.default && slots.default(),
      ), [[vShow, isActive.value]])

      return useTransition(props, content)
    }

    return () => [props.overlay ? genOverlay() : null, genContent()]
  },
})
