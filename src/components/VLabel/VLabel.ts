// Styles
import './VLabel.scss'

// Vue API
import { h, computed, defineComponent } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

// Effects
import { colorProps, useColors } from '../../effects/use-colors'

// Types
import { VNode } from 'vue'

const labelProps: any = {
  absolute: Boolean,
  disabled: Boolean,
  focused: Boolean,
  onField: Boolean,
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

  setup(props, { slots }): () => VNode {
    const { setTextColor } = useColors()

    const isActive = computed<boolean>(() => {
      return !!props.hasState || !!props.focused
    })

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-label': true,
        'v-label--active': isActive.value,
        'v-label--on-field': props.onField,
        'v-label--has-state': props.hasState,
        'v-label--is-disabled': !!props.disabled,
      }
    })

    const genDataProps = (): Record<string, any> => {
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

    return (): VNode => {
      const dataProps = setTextColor(props.color!, genDataProps())

      return h('label', dataProps, slots.default && slots.default())
    }
  },
})
