import { defineComponent, h, computed, VNode } from 'vue'
// Helpers
import { convertToUnit } from '../../helpers'

// Composables
import { useColors, colorProps } from '../../composable/use-colors'

export default defineComponent({
  name: 'v-toolbar',
  props: {
    fixed: Boolean,
    height: {
      type: [ String, Number ],
      default: 56
    },
    ...colorProps('#ffffff')
  },
  setup(props, { slots }): () => VNode {
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-toolbar': true,
      'v-toolbar--fixed': props.fixed,
      ...setBackgroundClassNameColor(props.color)
    }))

    const styles = computed<Record<string, string>>(() => ({
      height: convertToUnit(props.height),
      left: props.fixed ? convertToUnit(0) : '',
      top: props.fixed ? convertToUnit(0) : '',
      ...setBackgroundCssColor(props.color)
    }))

    return () => h('div', {
      class: classes.value,
      style: styles.value
    }, {
      default: () => slots.default?.()
    })
  }
})
