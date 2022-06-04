import { App } from 'vue'

export function install(app: App, args: any = {}) {
  if ((install as any).installed) return

  (install as any).installed = true

  const { components } = args
  const { directives } = args

  for (const key in components) {
    if (components[key]) {
      app.component(key, components[key])
    }
  }

  for (const key in directives) {
    if (directives[key]) {
      app.directive(key, directives[key])
    }
  }

  if (this.options) {
    app.provide('$options', this.options)
  }
}
