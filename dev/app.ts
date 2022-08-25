import { createApp } from 'vue'
import App from './App.vue'
import Vueland from './plugins/vueland'

const app = createApp(App)

app.use(Vueland)
app.mount('#app')
