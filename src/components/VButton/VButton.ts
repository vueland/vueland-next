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
import { convertToUnit } from '@/helpers'

export const VButton = defineComponent({
  name: 'v-button',
  emits: ['click'],
  props: {
    disabled: Boolean,
    outlined: Boolean,
    absolute: Boolean,
    left: Boolean,
    right: Boolean,
    text: Boolean,
    label: String,
    width: [String, Number],
    ...colorProps(),
    ...elevationProps(),
    ...positionProps(),
  } as any,

  setup(props, { slots, emit }): () => VNode {
    const { setTextColor, setBackground } = useColors()

    const { elevationClasses } = useElevation(props)

    const { positionClasses } = usePosition(props)

    const isFlat = computed<boolean>(() => {
      return props.text || props.outlined
    })

    const classes = computed<Record<string, boolean>>(() => ({
        'v-button': true,
        'v-button--disabled': props.disabled,
        'v-button--text': props.text || props.outlined,
        'v-button--outlined': props.outlined,
        ...elevationClasses.value,
        ...positionClasses.value,
      }),
    )

    function genLabel() {
      const propsData = {
        class: {
          'v-button__label': true,
        },
      }

      return h('span', propsData, props.label)
    }

    return () => {
      const setColor = isFlat.value ? setTextColor : setBackground
      const content: any[] = []

      const propsData = {
        class: classes.value,
        style: {
          minWidth: props.width && convertToUnit(props.width)
        },
        onClick: () => !props.disabled && emit('click')
      }

      props.label && content.push(genLabel())

      slots.default && content.push(slots.default())

      return h('button',
        props.color && !props.disabled
          ? setColor(props.color, propsData) : propsData,
        content,
      )
    }
  },
})
