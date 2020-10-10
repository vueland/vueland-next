import { createApp } from 'vue'
// @ts-ignore
import App from './App'
// @ts-ignore
import '../dist/vueland.css'
import Vueland from '../dist/vueland'

const app = createApp(App)
app.use(Vueland)
app.mount('#app')
