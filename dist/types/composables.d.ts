import { ComputedRef, Ref } from 'vue'

export type ActivatorListeners = {
  mouseenter: (e: Event) => void
  mouseleave: (e: Event) => void
  mouseover: (e: Event) => void
  mouseout: (e: Event) => void
  contextmenu: (e: Event) => void
  focus: (e: Event) => void
  blur: (e: Event) => void
  click: (e: Event) => void
  input: (e: Event) => void
  change: (e: Event) => void
}

export interface Dimensions {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
}

export type Positions = {
  positionClasses: ComputedRef<Record<string, boolean>>
}
export type Toggle = {
  isActive: Ref<boolean>
}
export type Elevetions = {
  elevationClasses: ComputedRef<Record<string, boolean>>
}
