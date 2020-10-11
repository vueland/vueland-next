import * as components from './components/index'

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
  }
}
