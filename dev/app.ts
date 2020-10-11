import { createApp } from 'vue'
// @ts-ignore
import App from './App'
import VueLand from '../src'

const app = createApp(App)
app.use(VueLand)
app.mount('#app')
