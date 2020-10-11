import { Component, Plugin } from 'vue'

declare const VueLand: Plugin
export default VueLand

export interface VueLandOptions {
  components?: Record<string, Component>
}

