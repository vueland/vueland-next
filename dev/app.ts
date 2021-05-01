import { createApp } from 'vue'
import App from './App'
import vueland from '../src'

const app = createApp(App)
app.use(vueland)
app.mount('#app')
