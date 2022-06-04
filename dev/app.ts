import { createApp } from 'vue'
import App from './App.vue'
import Vueland from '../src'
import colors from '../src/services/colors'
import '../src/styles/scss/main.scss'
import '../src/styles/scss/themes/vueland-theme.scss'

new Vueland({
  icons: 'fa',
  theme: {
    dark: false,
    themes: {
      light: {
        base: colors.grey.darken3,
        secondary: 'rgba(#fa5a5a, .3)',
        accent: '',
        error: 'pink accent-1',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})

const app = createApp(App)

app.use(Vueland, { ssr: false })
app.mount('#app')
