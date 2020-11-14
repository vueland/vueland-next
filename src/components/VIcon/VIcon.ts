// Styles
import './VIcon.scss'

// Vue API
import { defineComponent, h, computed } from 'vue'

// Effects
import { useColors, colorProps } from '../../effects/use-colors'
import { sizeProps } from '../../effects/use-sizes'

// Helpers
import { convertToUnit } from '../../helpers'

// Types
import { Props } from '../../types'

// Services
import { Sizes } from '../../services/sizes'

const vIconProps: Props = {
  disabled: Boolean,
  active: Boolean,
  clickable: Boolean,
  size: [String, Number],
  dense: Boolean,
  icon: String,
  iconType: String,
  tag: {
    type: String,
    default: 'i',
  },
  ...colorProps(),
  ...sizeProps(),
}

export const VIcon = defineComponent({
  name: 'v-icon',
  props: vIconProps,

  setup(props, { slots }) {
    const { setTextColor } = useColors()

    const icon = computed<string>(() => {
      return props.icon || (slots.default && slots.default()[0].children)
    })


    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-icon': true,
        'v-icon--disabled': props.disabled,
        'v-icon--link': props.clickable,
        'v-icon--dense': props.dense,
        'v-icon--clickable': props.clickable,
        [props.iconType]: !!props.iconType,
        [icon.value]: !!icon.value,
      }
    })

    const isMedium = computed(() => {
      return (
        !props.large &&
        !props.small &&
        !props.xLarge &&
        !props.xSmall &&
        !props.size
      )
    })

    const getSizes = () => {
      const sizes = {
        large: props.large,
        small: props.small,
        xLarge: props.xLarge,
        xSmall: props.xSmall,
        medium: isMedium.value,
      }

      const explicitSize = Object.keys(sizes).find(key => sizes[key])

      return (
        (explicitSize && Sizes[explicitSize]) || convertToUnit(props.size)
      )
    }

    const genPropsData = () => {
      return {
        class: {
          ...classes.value,
        },
        style: {
          fontSize: getSizes(),
        },
      }
    }

    const iconTag = props.clickable ? 'button' : props.tag

    return () => h(iconTag, setTextColor(props.color, genPropsData()))
  },
})
