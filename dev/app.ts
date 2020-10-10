import { createApp } from 'vue'
// @ts-ignore
import App from './App'
// @ts-ignore
import Retn from '@'

const app = createApp(App)
app.use(Retn)
app.mount('#app')
