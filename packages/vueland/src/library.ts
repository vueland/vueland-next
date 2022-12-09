// Types
import { Ref, ref, unref } from 'vue'
import { Library, UserOptions } from '../types'
import { App } from 'vue'

// @ts-ignore
import { lightTheme } from './composables/use-theme'

export class Vueland implements Library {
  theme: Ref<Maybe<UserOptions['theme']>>
  icons: Maybe<UserOptions['icons']>

  constructor() {
    this.icons = null
    this.theme = ref(lightTheme)
  }

  install(app: App, args: any = {}) {
    if ((this.install as any).installed) return

    (this.install as any).installed = true

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

    app.provide('$v', this)
    app.provide('$v_theme', this.theme)
    app.provide('$v_icons', this.icons)
  }

  setTheme(theme: UserOptions['theme']) {
    if (typeof document === 'undefined') {
      return
    }

    const root = document.documentElement

    this.theme.value = Object.assign(unref(this.theme) || {}, theme)

    Object.keys(unref(this.theme)!).forEach(key => {
      root.style.setProperty(`--${ key }`, unref(this.theme)![key])
    })
  }

  setIcons(icons: UserOptions['icons']) {
    this.icons = icons
  }
}
