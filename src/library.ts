// Types
import {Plugin, Ref, ref} from 'vue'
import { Library, UserOptions } from '../types'
import { install } from './install'
import { Maybe } from '../types/base'

export class Vueland {
  static install: Plugin['install'] = install
  static icons: Maybe<UserOptions['icons']> = null
  static theme: Ref<Maybe<UserOptions['theme']>> = ref(null)

  static setTheme(theme: UserOptions['theme']) {
    const html = document.querySelector('html')!

    Vueland.theme.value = Object.assign(Vueland.theme.value || {}, theme)

    Object.keys(Vueland.theme.value).forEach(key => {
      html.style.setProperty(`--${key}`, Vueland.theme.value![key])
    })
  }

  static setIcons(icons: UserOptions['icons']) {
    Vueland.icons = icons
  }
}

export default Vueland as Library
