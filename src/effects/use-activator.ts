// Vue API
import { ref } from 'vue'

// Types
import { OffsetSizes } from '../types'

type ActivatorListeners = {
  mouseenter?: (e: Event) => void
  mouseleave?: (e: Event) => void
  mouseover?: (e: Event) => void
  mouseout?: (e: Event) => void
  focus?: (e: Event) => void
  blur?: (e: Event) => void
  click?: (e: Event) => void
  input?: (e: Event) => void
  change?: (e: Event) => void
}

export function useActivator() {
  const activatorRef = ref<HTMLElement | null>(null)
  const activatorSizes: Partial<OffsetSizes> = {}
  const listeners: ActivatorListeners = {}

  const getActivatorSizes = () => {
    activatorSizes.left = (activatorRef.value! as any).$el.offsetLeft
    activatorSizes.top = (activatorRef.value! as any).$el.offsetTop
    activatorSizes.height = (activatorRef.value! as any).$el.offsetHeight
    activatorSizes.width = (activatorRef.value! as any).$el.offsetWidth

    return activatorSizes
  }

  const genActivatorListeners = (props, isActive) => {
    if (props.openOnHover) {
      listeners.mouseenter = () => {
        isActive.value = true
      }

      listeners.mouseleave = () => {
        isActive.value = false
      }
    }

    return listeners
  }

  const addActivatorEvents = () => {
    const events = Object.keys(listeners)

    if (activatorRef.value) {
      events.forEach(key => {
        activatorRef.value!.addEventListener(key, listeners[key])
      })
    }
  }

  const removeActivatorEvents = () => {
    const events = Object.keys(listeners)

    if (activatorRef.value) {
      events.forEach(key => {
        activatorRef.value!.removeEventListener(key, listeners[key])
      })
    }
  }

  return {
    activatorRef,
    getActivatorSizes,
    addActivatorEvents,
    removeActivatorEvents,
    genActivatorListeners,
  }
}
