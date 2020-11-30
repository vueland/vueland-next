import { ref } from 'vue'

type ActivatorSizes = {
  offsetLeft: number
  offsetTop: number
  offsetWidth: number
  offsetHeight: number
}

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
  const activatorSizes: Partial<ActivatorSizes> = {}
  const listeners: ActivatorListeners = {}

  const setActivatorSizes = () => {
    activatorSizes.offsetLeft = activatorRef.value?.offsetLeft
    activatorSizes.offsetTop = activatorRef.value?.offsetTop
    activatorSizes.offsetHeight = activatorRef.value?.offsetHeight
    activatorSizes.offsetWidth = activatorRef.value?.offsetWidth

    return { activatorSizes }
  }

  const genActivatorListeners = (props, isActive) => {
    if (props.openOnHover) {
      listeners.mouseenter = () => {
        isActive.value = !isActive.value
      }

      listeners.mouseleave = () => {
        isActive.value = !isActive.value
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
    setActivatorSizes,
    addActivatorEvents,
    removeActivatorEvents,
    genActivatorListeners,
  }
}
