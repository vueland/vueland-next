// Vue API
import { defineComponent, h, computed } from 'vue'

// Compositions
import { colorProps, useColors } from '../../composable/use-colors'
import { elevationProps, useElevation } from '../../composable/use-elevation'

// Types
import { VNode } from 'vue'

export const VCard = defineComponent({
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
      })
    )

    const styles = computed(() => ({
      width: `${props.width}px`,
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    function genCard() {
      const propsData = {
        class: classes.value,
        style: styles.value,
      }
      return h('div', propsData, slots.default && slots.default())
    }

    return () => genCard()
  },
})
