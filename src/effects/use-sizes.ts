import { computed } from 'vue'
import { Props } from '../types'

export function sizeProps(): Props {
  return {
    large: Boolean,
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean,
  }
}

export function useSizes(props) {
  const medium = computed<boolean>(() => {
    return props.large && props.small && props.xLarge && props.xSmall
  })

  const sizeClasses = computed<Record<string, boolean>>(() => {
    return {
      'v-size--x-small': props.xSmall,
      'v-size--small': props.small,
      'v-size--default': medium.value,
      'v-size--large': props.large,
      'v-size--x-large': props.xLarge,
    }
  })

  return {
    sizeClasses,
  }
}
