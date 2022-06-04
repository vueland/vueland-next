// @ts-ignore
// import paths from './paths.json'
// Types
import { UserOptions } from '../types'
import { install } from './install'

export class Vueland {
  static options: UserOptions
  static install: Function = install

  constructor(options?: UserOptions) {
    Vueland.options = options!
  }
}

// static install(app: App, args: any = {}) {
//   if (Vueland.installed) return
//
//   Vueland.installed = true
//
//   Object.keys(paths).forEach((key) => {
//     if (key && paths[key]) {
//       if (args.ssr) {
//         app.component(key, components[key])
//       } else {
//         app.component(key, defineAsyncComponent(
//           () => import(/*Vueland_component*/`${ paths[key] }`))
//         )
//       }
//     }
//   })
//
//   Object.keys(directives).forEach((key) => {
//     if (key && (directives as any)[key]) {
//       app.directive(key, (directives as any)[key])
//     }
//   })
//
//   app.provide('$options', Vueland.options)
// }
