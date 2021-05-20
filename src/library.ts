import * as components from './components'
import * as directives from './directives'
import { UserOptions } from '../types'

export class Vueland {
  static installed: boolean = false
  static options: UserOptions
  public userOptions: UserOptions | undefined

  constructor(options?: UserOptions) {
    this.userOptions = options
    Vueland.options = this.userOptions!
  }

  static install(app: any) {
    if (Vueland.installed) return

    Vueland.installed = true

    Object.keys(components).forEach((key) => {
      if (key && (components as any)[key]) {
        const component = (components as any)[key]
        app.component(key, component as typeof app)
      }
    })

    Object.keys(directives).forEach((key) => {
      if (key && (directives as any)[key]) {
        app.directive(key, (directives as any)[key])
      }
    })

    app.provide('$options', Vueland.options)
  }
}
