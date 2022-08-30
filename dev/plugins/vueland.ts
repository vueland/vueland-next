import { createVueland } from '../../src'

import * as components from '../../src/components/async-components'
import * as directives from '../../src/directives'
// Services
import colors from '../../src/services/colors'
// Styles
import '../../src/styles/scss/main.scss'
import '../../src/styles/scss/themes/vueland-theme.scss'

export const vueland = createVueland({
  components,
  directives,
})

vueland.setIcons('fa')

vueland.setTheme({
  primary: colors.blue.darken3,
  secondary: colors.purple.darken1,
  accent: colors.green.accent3,
  error: colors.red.accent4,
  success: colors.green.base,
  warning: colors.orange.base,
  base: colors.white.base,
  content: colors.grey.darken3,
})

export default vueland
