// @ts-ignore
import components from './paths.json'
import * as directives from './directives'
import { UserOptions } from '../types'
import { defineAsyncComponent } from 'vue'

export class Vueland {
  static installed: boolean = false
  static options: UserOptions

  constructor(options?: UserOptions) {
    Vueland.options = options!
  }

  static install(app: any) {
    if (Vueland.installed) return

    Vueland.installed = true

    Object.keys(components).forEach((key) => {
      if (key && components[key]) {
        app.component(key, defineAsyncComponent(
          () => import(`${ components[key] }`)),
        )
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
