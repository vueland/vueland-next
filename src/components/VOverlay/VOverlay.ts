// Styles
import './VOverlay.scss'

// Vue API
import { defineComponent, computed, h, VNode } from 'vue'

// Compositions
import { useColors } from '@/effects/use-colors'

// Types
import { Props } from '../../types'

const overlayProps: Props = {
  hide: Boolean,
  active: Boolean,
  color: String,
}

export const VOverlay = defineComponent({
  name: 'v-overlay',
  props: overlayProps,

  setup(props): VNode {
    const { setBackground } = useColors()

    const classes = computed(() => {
      return {
        'v-overlay': true,
        'v-overlay--hidden': props.hide,
        'v-overlay--active': props.active,
      }
    })

    const genDataProps = () => ({
      class: classes.value,
      style: [],
      ref: 'overlay',
    })

    return h('div', setBackground(props.color, genDataProps()))
  },
})
