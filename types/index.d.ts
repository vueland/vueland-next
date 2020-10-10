import { Component, Plugin } from 'vue'

declare const Vueland: Plugin
export default Vueland

export interface VuelandOptions {
  components?: Record<string, Component>
}

