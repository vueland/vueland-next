import { inject } from 'vue'

export function themeProps() {
  return {
    dark: Boolean
  }
}

export function useTheme() {
  const options: any = inject('$options')

  return options?.theme || null
}
