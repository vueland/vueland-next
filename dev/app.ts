import { createApp } from 'vue'
// @ts-ignore
import App from './App'
import Vueland from '../src'

const app = createApp(App)
app.use(Vueland)
app.mount('#app')
