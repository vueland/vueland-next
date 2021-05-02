import { createApp } from 'vue'
import App from './App.vue'
import Vueland from '../src'

const vueland = new Vueland({
  icons: 'material-icons'
})

const app = createApp(App)
app.use(vueland)
app.mount('#app')
