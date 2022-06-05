import { App } from 'vue'
import { Vueland } from './library'
import * as directives from './directives'
import { components } from './components'

const install = Vueland.install

Vueland.install = (app: App, args: any) => {
  install.call(Vueland, app, {
    components,
    directives,
    ...args
  })
}

export default Vueland
