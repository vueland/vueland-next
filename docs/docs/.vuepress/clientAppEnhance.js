import { defineClientAppEnhance } from '@vuepress/client'
import { Vueland } from 'vueland'
import * as components from './components'
import 'vueland/dist/vueland.css'
import './styles/js.css'

const vueland = new Vueland({
  icons: 'material-icons',
})

export default defineClientAppEnhance(({ app }) => {
  app.use(vueland)
  Object.keys(components).forEach((cmp) => {
    app.component(cmp, components[cmp])
  })
})
