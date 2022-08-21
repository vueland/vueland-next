import { App } from 'vue'
import { Vueland } from './library'
import { defaultTheme } from './composable/use-theme'

export function install(app: App, args: any = {}) {
  if ((install as any).installed) return

  (install as any).installed = true

  const { components, directives } = args

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

  console.log(Vueland.theme.value)

  if (!Vueland.theme.value) Vueland.setTheme(defaultTheme)

  app.provide('$v_theme', Vueland.theme)
  app.provide('$v_icons', Vueland.icons)

  return new Vueland()
}
