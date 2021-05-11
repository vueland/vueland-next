import { inject } from 'vue'
import { ThemeOptions } from '../types'
import colors from '../utils/colors'

type ThemeColors = {
  dark: ThemeOptions
  light: ThemeOptions
}

const defaultThemeColors: ThemeColors = {
  light: {
    base: colors.grey.darken4,
    primary: colors.blue.base,
    secondary: colors.blue.darken2,
    accent: colors.blue.accent3,
    error: colors.red.accent3,
    info: colors.blue.accent3,
    success: colors.green.base,
    warning: colors.amber.base
  },

  dark: {
    base: colors.shades.white,
    primary: colors.purple.base,
    secondary: colors.purple.darken2,
    accent: colors.pink.accent2,
    error: colors.red.accent3,
    info: colors.blue.accent3,
    success: colors.green.accent3,
    warning: colors.amber.accent3
  }
}

export function themeProps() {
  return {
    dark: Boolean
  }
}

export function useTheme() {
  const options: any = inject('$options')
  const light = options?.theme?.themes?.light || {}
  const dark = options?.theme?.themes?.dark || {}

  if (!options?.theme.dark) {
    return {
      ...defaultThemeColors.light,
      ...light
    }
  }

  return {
    ...defaultThemeColors.dark,
    ...dark
  }
}
