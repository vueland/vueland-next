import { inject } from 'vue'
import { Library } from '../../types'

export const lightTheme = {
  base: '#ffffff',
  primary: '#1E88E5',
  secondary: '#00acc1',
  content: '#424242',
  warning: '#fb8c00',
  success: '#4CAF50',
  error: '#f4511e',
  accent: '#00E676',
}

export const themeableProps = () => ({
  themeable: Boolean,
})

export const useTheme = () => {
  const $v: Library = inject('$v')!

  return {
    theme: inject('$v_theme'),
    icons: inject('$v_icons'),
    setTheme: $v.setTheme.bind($v),
    setIcons: $v.setIcons.bind($v),
  }
}
