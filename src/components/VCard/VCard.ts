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
    const { setBackground } = useColors(props)
    const { elevationClasses } = useElevation(props)

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-card': true,
        ...elevationClasses.value,
      }
    })

    const dataObject: object = {
      class: classes.value,
      style: {
        maxWidth: `${props.width}px`,
      },
    }

    const slotContent = slots.default && slots.default()

    return () => h('div', setBackground(props.color, dataObject), slotContent)
  },
})
