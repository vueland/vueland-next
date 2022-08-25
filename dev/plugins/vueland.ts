import Vueland from '../../src'
import colors from '../../src/services/colors'
// Styles
import '../../src/styles/scss/main.scss'
import '../../src/styles/scss/themes/vueland-theme.scss'

Vueland.setIcons('material-icons')

Vueland.setTheme({
  primary: colors.green.accent3,
  secondary: colors.purple.darken1,
  accent: colors.green.accent3,
  error: colors.red.accent4,
  success: colors.green.base,
  warning: colors.orange.base,
  base: colors.white.base,
  content: colors.grey.lighten1
})

export default Vueland
