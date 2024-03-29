import { createVueland } from '../../vueland/src'

import * as components from '../../vueland/src/components/async-components'
import * as directives from '../../vueland/src/directives'
// Services
// import colors from '../../vueland/src/services/colors'
// Styles
import '../../vueland/src/styles/scss/main.scss'
import '../../vueland/src/styles/scss/themes/vueland-theme.scss'

export const vueland = createVueland({
  components,
  directives,
  ssr: true
})

vueland.setIcons('fa')

vueland.setTheme({
  // primary: colors.blue.darken3,
  // secondary: colors.purple.darken1,
  // accent: colors.green.accent3,
  // error: colors.green.accent4,
  // success: colors.green.base,
  // warning: colors.orange.base,
  // base: colors.grey.darken4,
  // content: colors.green.accent3,
})

export default vueland
