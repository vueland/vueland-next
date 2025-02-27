import { App } from 'vue'
import { Vueland } from './library'
import "./styles/scss/reset.scss"
import "./styles/scss/main.scss"

export const createVueland = (options = {}) => {
  const library = new Vueland()
  const { install } = library

  Vueland.prototype.install = (app: App, args: any) => {
    install.call(library, app, {
      ...options,
      ...args,
    })

    app.config.globalProperties.$vueland = library
  }

  return library
}

export default createVueland

