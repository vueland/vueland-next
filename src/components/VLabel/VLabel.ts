// Styles
import './VLabel.scss'

// Vue API
import {
  h,
  computed,
  defineComponent
} from 'vue'

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
  hasState: Boolean,
  ...colorProps(),
}

export const VLabel = defineComponent({
  name: 'v-label',
  props: labelProps,

  setup(props, { slots }) {
    const { setTextColor } = useColors()

    const isActive = computed(() => {
      return !!props.hasState || !!props.focused
    })

    const classes = computed<Record<string, boolean>>(
      () => {
        return {
          'v-label': true,
          'v-label--active': isActive.value,
          'v-label--is-disabled': !!props.disabled,
        }
      },
    )

    const genDataProps = () => {
      return {
        class: {
          ...classes.value,
        },
        style: {
          left: convertToUnit(props.left),
          right: convertToUnit(props.right),
          position: props.absolute ? 'absolute' : 'relative',
        },
      }
    }

    return h(
      'label',
      setTextColor(props.color!, genDataProps()),
      slots.default && slots.default(),
    )
  },
})
