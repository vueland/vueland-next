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
    const OVERLAY_TIMEOUT = 50

    const { isActive } = useToggle(props)

    const showOverlay = ref(false)

    if (props.overlay) {
      showOverlay.value = isActive.value

      watch(() => isActive.value, (to) => {
        setTimeout(() => showOverlay.value = to, OVERLAY_TIMEOUT)
      })
    }

    const genOverlay = () => {
      const overlay = withDirectives(
        h(VOverlay, {
          active: showOverlay.value,
          hide: !showOverlay.value,
          color: props.overlayColor,
        }),
        [[vShow, (isActive.value)]],
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
