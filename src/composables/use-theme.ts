import { inject } from 'vue'
import colors from '../services/colors'
import { Vueland } from '../library'
import { ThemeOptions } from '../../types'

export const defaultTheme = {
  primary: colors.blue.darken1,
  secondary: colors.green.base,
}

export const themeableProps = () => ({
  themeable: Boolean
})

export const useTheme = () => ({
  theme: inject('$v_theme'),
  icons: inject('$v_icons'),
  setTheme: (options: ThemeOptions) => Vueland.setTheme(options)
})
