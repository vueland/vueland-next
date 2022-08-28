import { App } from 'vue'
import { Vueland } from './library'

export const createVueland = (options = {}) => {
  const library = new Vueland()
  const { install } = library

  Vueland.prototype.install = (app: App, args: any) => {
    install.call(library, app, {
      ...options,
      ...args,
    })
  }

  return library
}

export default createVueland

