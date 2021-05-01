import * as components from './components/index'
import * as directives from './directives/index'

export class Vueland {
  static installed: boolean = false

  public userOptions: any = {}

  constructor(options: any = null) {
    this.userOptions = options
  }

  install(app: any) {
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

    app.provide('$options', this.userOptions)
  }
}
