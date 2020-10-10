import { Plugin, Component } from 'vue'

export interface Vueland {
  install: Plugin
}

declare const Vueland: Vueland
export default Vueland


export interface VuelandOptions {
  components?: Record<string, Component>
}

