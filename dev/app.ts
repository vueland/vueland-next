import { createApp } from 'vue'
import App from './App.vue'
import Vueland from '../src'
import colors from '../src/utils/colors'

const vueland = new Vueland({
  icons: 'material-icons',
  theme: {
    dark: true,
    themes: {
      dark: {
        base: colors.indigo.base,
        primary: colors.blue.base,
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
app.use(vueland)
app.mount('#app')
