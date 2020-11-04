// Styles
import './VCard.scss'

// Vue API
import { defineComponent, h, computed } from 'vue'

// Compositions
import { colorProps, useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'

// Types
import { Props } from '../../types'
import { VNode } from 'vue'

const cardProps: Props = {
  width: [String, Number],
  ...colorProps(),
  ...elevationProps(),
}

export const VCard = defineComponent({
  props: cardProps,

  setup(props, { slots }): () => VNode {
    const { setBackground } = useColors()
    const { elevationClasses } = useElevation(props)

    const classes = computed(
      (): Record<string, boolean> => {
        return {
          'v-card': true,
          ...elevationClasses.value,
        }
      },
    )

    const dataProps = () => {
      return {
        class: classes.value,
        style: { maxWidth: `${props.width}px` },
      }
    }

    return () =>
      h(
        'div',
        props.color ? setBackground(props.color, dataProps()) : dataProps(),
        slots.default && slots.default(),
      )
  },
})
