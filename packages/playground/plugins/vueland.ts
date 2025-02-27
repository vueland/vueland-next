import { createVueland } from 'vueland'
import 'vueland/dist/vueland.css'
import { VApp } from 'vueland/dist/components/VApp/VApp'
import 'vueland/dist/components/VApp/VApp.css'
import { colors } from 'vueland/dist/constants/colors'

export const vueland = createVueland({
  components: {
    VApp
  },
  ssr: true
})

vueland.setIcons('fa')

vueland.setTheme({
  primary: colors.blue.darken3,
  secondary: colors.purple.darken1,
  accent: colors.green.accent3,
  error: colors.green.accent4,
  success: colors.green.base,
  warning: colors.orange.base,
  base: colors.grey.darken4,
  content: colors.grey.darken3,
})

export default vueland
