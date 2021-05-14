import { defineClientAppEnhance } from '@vuepress/client'
import { Vueland } from '../../../'
import '../../../dist/vueland.css'
import * as components from './components'

const vueland = new Vueland({
  icons: 'material-icons',
})

export default defineClientAppEnhance(({ app }) => {
  app.use(vueland)
  Object.keys(components).forEach((cmp) => {
    app.component(cmp, components[cmp])
  })
})
