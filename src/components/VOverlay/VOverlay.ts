// Styles
import './VOverlay.scss'

// Vue API
import { defineComponent, computed, h } from 'vue'

// Compositions
import { useColors } from '@/composable/use-colors'

// Types
import { VNode } from 'vue'

export const VOverlay = defineComponent({
  name: 'v-overlay',

  props: {
    hide: Boolean,
    active: Boolean,
    color: String,
    fixed: Boolean,
  } as any,

  setup(props): VNode {
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()

    const classes = computed(() => {
      return {
        'v-overlay': true,
        'v-overlay--hidden': props.hide,
        'v-overlay--active': props.active,
        ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
      }
    })

    const styles = computed(() => ({
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    return h('div', {
      class: classes.value,
      style: styles.value,
      ref: 'overlay',
    })
  },
})
