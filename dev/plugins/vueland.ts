import Vueland from '../../src'
import colors from '../../src/services/colors'

Vueland.setIcons('material-icons')

Vueland.setTheme({
  primary: colors.blue.darken4,
  secondary: colors.purple.darken1,
  accent: colors.green.accent3,
  error: colors.red.accent3,
  success: colors.green.base,
  warning: colors.orange.base,
  base: colors.white.base,
  content: colors.grey.darken2
})

export default Vueland
