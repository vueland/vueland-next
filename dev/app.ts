import { createApp } from 'vue'
import App from './App.vue'
import Vueland from '../src'
import colors from '../src/services/colors'
import '../src/styles/scss/main.scss'
import '../src/styles/scss/themes/vueland-theme.scss'

Vueland.setIcons('material-icons')

Vueland.setTheme({
  primary: colors.purple.darken1,
  secondary: colors.purple.darken1,
  accent: colors.green.accent3,
  error: colors.red.accent1,
  success: colors.green.base,
  warning: colors.orange.base,
  base: colors.grey.darken3,
})

const app = createApp(App)

app.use(Vueland)
app.mount('#app')
