// Vue API
import { defineComponent, h, computed } from 'vue'

// Compositions
import { colorProps, useColors } from '../../composables/use-colors'
import { elevationProps, useElevation } from '../../composables/use-elevation'

// Types
import { VNode } from 'vue'

export default defineComponent({
  name: 'v-card',

  props: {
    width: {
      type: [String, Number],
      default: 350,
    },
    ...colorProps(),
    ...elevationProps(),
  } as any,

  setup(props, { slots }): () => VNode {
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()
    const { elevationClasses } = useElevation(props)

    const classes = computed(
      (): Record<string, boolean> => ({
        'v-card': true,
        ...elevationClasses.value,
        ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
      }),
    )

    const styles = computed(() => ({
      width: `${ props.width }px`,
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    return () => h('div', {
      class: classes.value,
      style: styles.value,
    }, slots.default?.())
  },
})
