// Types
import { Plugin, Ref, ref } from 'vue'
import { UserOptions } from '../types'
import { install } from './install'
import { Maybe } from '../types/base'

class Vueland {
  static install: Plugin['install'] = install
  static icons: Maybe<UserOptions['icons']> = null
  static theme: Ref<Maybe<UserOptions['theme']>> = ref(null)

  static setTheme(theme: UserOptions['theme']) {
    const root = document.documentElement

    Vueland.theme.value = Object.assign(Vueland.theme.value || {}, theme)

    Object.keys(Vueland.theme.value).forEach(key => {
      root.style.setProperty(`--${ key }`, Vueland.theme.value![key])
    })
  }

  static setIcons(icons: UserOptions['icons']) {
    Vueland.icons = icons
  }
}

export { Vueland }
