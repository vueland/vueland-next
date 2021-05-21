// Vue API
import { ref } from 'vue'

// Types
import { OffsetSizes } from '../../types'

type ActivatorListeners = {
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

export function activatorProps() {
  return {
    activator: {
      type: [Object, String],
    },
    internalActivator: Boolean,
  }
}

export function useActivator(props: any = null) {
  const activatorRef = ref<HTMLElement | null>(null)
  const activatorSizes: Partial<OffsetSizes> = {}
  const listeners: Partial<ActivatorListeners> = {}

  const getActivator = (e?: Event): HTMLElement | null => {
    if (activatorRef.value) return activatorRef.value

    const target = props.internalActivator ? '' : (document as any)

    if (props?.activator) {
      if (typeof props.activator === 'string') {
        return (activatorRef.value = target.querySelector(props.activator))
      }

      if (props.activator.value.$el) {
        return (activatorRef.value = props.activator.value.$el)
      }

      if (props.activator.value) {
        return (activatorRef.value = props.activator.value)
      }
    }

    if (e) {
      return (activatorRef.value = (e.target || e.currentTarget) as HTMLElement)
    }

    return null
  }

  const getActivatorSizes = () => {
    const el = (activatorRef.value! as any).$el || (activatorRef.value! as any)
    activatorSizes.left = el.offsetLeft
    activatorSizes.top = el.offsetTop
    activatorSizes.height = el.offsetHeight
    activatorSizes.width = el.offsetWidth

    return activatorSizes
  }

  const genActivatorListeners = (props, handlers) => {
    if (props.openOnHover) {
      listeners.mouseenter = () => {
        handlers.mouseenter()
      }

      listeners.mouseleave = () => {
        handlers.mouseleave()
      }
    }

    if (props.openOnClick) {
      listeners.click = () => handlers.click()
    }

    if (props.openOnContextmenu) {
      listeners.contextmenu = () => handlers.contextmenu()
    }

    return listeners
  }

  const addActivatorEvents = () => {
    const events = Object.keys(listeners)

    console.log(activatorRef.value)

    if (activatorRef.value) {
      events.forEach((key) => {
        activatorRef.value!.addEventListener(key, listeners[key])
      })
    }
  }

  const removeActivatorEvents = () => {
    const events = Object.keys(listeners)

    if (activatorRef.value) {
      events.forEach((key) => {
        activatorRef.value!.removeEventListener(key, listeners[key])
      })
    }
  }

  return {
    activatorRef,
    getActivator,
    getActivatorSizes,
    addActivatorEvents,
    removeActivatorEvents,
    genActivatorListeners,
  }
}
