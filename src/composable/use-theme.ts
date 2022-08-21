import { ref, inject } from 'vue'
import colors from '../services/colors'
import { Vueland } from '../library'

export const defaultTheme = ref({
  primary: colors.blue.darken1,
  secondary: colors.green.base,
})

export const useTheme = () => {
  const theme = inject('$v_theme')

  const setTheme = (newTheme) => {
    Vueland.setTheme(newTheme)
  }

  return {
    theme,
    setTheme
  }
}
