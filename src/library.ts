import * as components from './components/index'

export class Retn {
  static installed: boolean = false

  install(Vue: any) {
    if (Retn.installed) return
    Retn.installed = true

    Object.keys(components).forEach(key => {
      if (key && (components as any)[key]) {
        const component = (components as any)[key]
        Vue.component(key, component as typeof Vue)
      }
    })
  }
}
