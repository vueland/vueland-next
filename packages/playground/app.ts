import { createApp } from 'vue'
import App from './App.vue'
import { vueland } from './plugins/vueland'

const app = createApp(App)

app.use(vueland)
app.mount('#app')

console.log(app)
