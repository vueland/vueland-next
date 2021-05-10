import { createApp } from 'vue'
import App from './App.vue'
import Vueland from '../src'

const vueland = new Vueland({
  icons: 'material-icons',
  theme: {
    dark: true,
    themes: {
      light: 'color',
      dark: {
        base: 'red darken-1',
        primary: 'blue darken-3'
      }
    }
  }
})

const app = createApp(App)
app.use(vueland)
app.mount('#app')
