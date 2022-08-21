import { createApp } from 'vue'
import App from './App.vue'
import Vueland from './plugins/vueland'
import '../src/styles/scss/main.scss'
import '../src/styles/scss/themes/vueland-theme.scss'

const app = createApp(App)

app.use(Vueland)
app.mount('#app')
