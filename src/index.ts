import { App } from 'vue'
import { Vueland } from './library'
import * as directives from './directives'
import { components } from './components'

export const createLibrary = () => {
  const library = new Vueland()
  const { install } = library

  library.install = (app: App, args: any) => {
    install.call(library, app, {
      components,
      directives,
      ...args
    })
  }

  return library
}

