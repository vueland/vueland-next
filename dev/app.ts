import { createApp } from 'vue'
import App from './App.vue'
import Vueland from '../src'

const vueland = new Vueland({
  icons: 'material-icons',
  theme: {
    dark: true,
    themes: {
      dark: {
        base: 'white',
        primary: 'purple accent-3',
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
