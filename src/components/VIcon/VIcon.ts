// Styles
import './VIcon.scss'

// Vue API
import { defineComponent, h, computed } from 'vue'

// Effects
import { useColors, colorProps } from '../../effects/use-colors'
import { useSizes, sizeProps } from '../../effects/use-sizes'

// Helpers
import { convertToUnit } from '../../helpers'

// Types
import { Props } from '@/types'

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

enum SIZE_MAP {
  xSmall = '12px',
  small = '16px',
  default = '24px',
  medium = '28px',
  large = '36px',
  xLarge = '40px',
}

export const VIcon = defineComponent({
  name: 'v-icon',
  props: vIconProps,

  setup(props) {
    const { setTextColor } = useColors()
    const { sizeClasses } = useSizes(props)

    const classes = computed(() => {
      return {
        'v-icon': true,
        'v-icon--disabled': props.disabled,
        'v-icon--link': props.clickable,
        'v-icon--dense': props.dense,
        'v-icon--clickable': props.clickable,
        [props.iconType]: !!props.iconType,
        [props.icon]: !!props.icon,
        ...sizeClasses.value,
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
        (explicitSize && SIZE_MAP[explicitSize]) || convertToUnit(props.size)
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
