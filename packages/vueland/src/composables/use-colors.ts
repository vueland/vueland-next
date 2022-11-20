import { isCssColor } from '../utils/color-parser'

export const colorProps = (defaultColor: string = '') => ({
  color: {
    type: String,
    default: defaultColor,
  },
})

export const useColors = () => {
  const setTextClassNameColor = (color: string) => {
    const classes = {}

    if (!isCssColor(color)) {
      const [colorName, colorModifier] = color.trim().split(' ', 2)
      colorName && (classes[`${colorName}--text`] = true)
      colorModifier && (classes[`text--${colorModifier}`] = true)
    }

    return classes
  }

  const setTextCssColor = (color: string): Record<string, string> => {
    const styles: any = {}

    if (isCssColor(color)) {
      styles.color = color
    }

    return styles
  }

  const setBackgroundCssColor = (color: string) => {
    const styles = {}

    if (isCssColor(color)) {
      styles['background-color'] = color
      styles['border-color'] = color
    }

    return styles
  }

  const setBackgroundClassNameColor = (color: string) => {
    const classes = {}

    if (!isCssColor(color)) {
      const [colorName, colorModifier] = color.trim().split(' ', 2)
      colorName && (classes[colorName] = true)
      colorModifier && (classes[colorModifier] = true)
    }

    return classes
  }

  return {
    setTextCssColor,
    setTextClassNameColor,
    setBackgroundCssColor,
    setBackgroundClassNameColor,
  }
}
