import './VLabel.scss'

// Vue API
import { defineComponent, h, computed } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

const labelProps = {
  absolute: Boolean,
  disabled: Boolean,
  focused: Boolean,
  for: String,
  left: {
    type: [Number, String],
    default: 0,
  },
  right: {
    type: [Number, String],
    default: 'auto',
  },
  value: Boolean,
  ...colorProps()
}

export const VLabel = defineComponent({
  name: 'v-label',
  props: labelProps,

  setup(props, { slots }) {
    const { setTextColor } = useColors(props)

    const classes = computed((): Record<string, boolean> => {
      return {
        'v-label--active': !!props.value,
        'v-label--is-disabled': !!props.disabled,
      }
    })

    const genDataProps = () => {
      return {
        class: {
          ...classes.value
        },
        style: {
          left: convertToUnit(props.left),
          right: convertToUnit(props.right),
          position: props.absolute ? 'absolute' : 'relative',
        },
      }
    }

    return h('label',
      setTextColor(props.color!, genDataProps()),
      slots.default && slots.default()
    )
  }
})
