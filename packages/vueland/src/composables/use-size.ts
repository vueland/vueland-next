import { computed } from 'vue'

export const sizeProps = (defaultSize: string = '') => {
  return {
    sm: {
      type: Boolean,
      default: defaultSize === 'sm',
    },
    md: {
      type: Boolean,
      default: defaultSize === 'md',
    },
    lg: {
      type: Boolean,
      default: defaultSize === 'lg',
    },
    xl: {
      type: Boolean,
      default: defaultSize === 'xl',
    },
  }
}

export const useSize = (props) => {
  const sizes = Object.keys(sizeProps())

  const size = computed<string>(() => sizes.find((s) => props[s])!)

  return {
    size,
  }
}
