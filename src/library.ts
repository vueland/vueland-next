import * as components from './components/index'
import * as directives from './directives/index'

class Vueland {
  static installed: boolean = false

  install(Vue: any) {
    if (Vueland.installed) return
    Vueland.installed = true

    Object.keys(components).forEach((key) => {
      if (key && (components as any)[key]) {
        const component = (components as any)[key]
        Vue.component(key, component as typeof Vue)
      }
    })

    Object.keys(directives).forEach((key) => {
      if (key && (directives as any)[key]) {
        Vue.directive(key, (directives as any)[key])
      }
    })
  }
}

export const library: Vueland = new Vueland()
