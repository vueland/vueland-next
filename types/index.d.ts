import { Component } from 'vue'

export interface Retn {
  install: (Vue) => void
  components?: RetnOptions
}

declare const Retn: Retn
export default Retn

export interface RetnOptions {
  components?: Record<string, Component>
}
