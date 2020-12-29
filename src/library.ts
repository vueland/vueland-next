import * as components from './components/index'
import * as directives from './directives/index'

export class VueLand {
  static installed: boolean = false

  install(Vue: any) {
    if (VueLand.installed) return
    VueLand.installed = true

    Object.keys(components).forEach(key => {
      if (key && (components as any)[key]) {
        const component = (components as any)[key]
        Vue.component(key, component as typeof Vue)
      }
    })

    Object.keys(directives).forEach(key => {
      if (key && (directives as any)[key]) {
        const directive = (directives as any)[key]
        Vue.directive(key, directive as any)
      }
    })
  }
}

