import { createLibrary } from '../../'
import colors from '../../src/services/colors'
// Styles
import '../../src/styles/scss/main.scss'
import '../../src/styles/scss/themes/vueland-theme.scss'

const vueland = createLibrary()

console.log(vueland)

vueland.setIcons('material-icons')

vueland.setTheme({
  primary: colors.green.accent3,
  secondary: colors.purple.darken1,
  accent: colors.green.accent3,
  error: colors.red.accent4,
  success: colors.green.base,
  warning: colors.orange.base,
  base: colors.grey.darken3,
  content: colors.white.base,
})

export default vueland
