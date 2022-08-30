import { inject } from 'vue'
import colors from '../services/colors'
import { Library } from '../../types'

export const defaultTheme = {
  primary: colors.blue.darken1,
  secondary: colors.green.base,
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
