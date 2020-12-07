// Styles
import './VButton.scss'

// Vue API
import { defineComponent, h, computed } from 'vue'

// Compositions
import { colorProps, useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { positionProps, usePosition } from '../../effects/use-position'

// Types
import { VNode } from 'vue'

const buttonProps: any = {
  disabled: Boolean,
  outlined: Boolean,
  absolute: Boolean,
  left: Boolean,
  right: Boolean,
  text: Boolean,
  label: String,
  ...colorProps(),
  ...elevationProps(),
  ...positionProps(),
}

export const VButton = defineComponent({
  name: 'v-button',
  props: buttonProps,

  setup(props, { slots }): () => VNode {
    const { setTextColor, setBackground } = useColors()

    const { elevationClasses } = useElevation(props)

    const { positionClasses } = usePosition(props)

    const isFlat = computed<boolean>(() => {
      return props.text || props.outlined
    })

    const classes = computed(
      (): Record<string, boolean> => {
        return {
          'v-button': true,
          'v-button--disabled': props.disabled,
          'v-button--text': props.text || props.outlined,
          'v-button--outlined': props.outlined,
          ...elevationClasses.value,
          ...positionClasses.value,
        }
      },
    )

    const genDataProps = () => {
      return {
        class: classes.value,
      }
    }

    const genLabel = () => {
      const dataProps = {
        class: {
          'v-button__label': true,
        },
      }

      return h('span', dataProps, props.label)
    }

    return () => {
      const setColor = isFlat.value ? setTextColor : setBackground
      const content: any[] = []

      const dataProps = props.color
        ? setColor(props.color, genDataProps())
        : genDataProps()

      props.label && content.push(genLabel())
      slots.default && content.push(slots.default())

      return h('button', dataProps, content)
    }
  },
})
