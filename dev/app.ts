import { createApp } from 'vue'
import App from './App.vue'
import { Vueland } from '../src'
import colors from '../src/utils/colors'
import '../dist/vueland.css'

new Vueland({
  icons: 'material-icons',
  theme: {
    dark: false,
    themes: {
      light: {
        base: colors.blue.darken4,
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

app.use(Vueland)
app.mount('#app')
