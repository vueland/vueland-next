import { ref, ComponentPublicInstance } from 'vue'
import { ActivatorListeners, Dimensions } from '../../types/composables'
import { Maybe } from '../../types/base'

export function activatorProps() {
  return {
    activator: {
      type: [Object, String],
      default: null,
    },
    internalActivator: Boolean,
  }
}

export const useActivator = (props) => {
  const activatorRef =
    ref<Maybe<HTMLElement | ComponentPublicInstance<any>>>(null)
  const activatorSizes: Partial<Dimensions> = {}
  const listeners: Partial<ActivatorListeners> = {}

  const getActivator = (e?: Event): Maybe<HTMLElement> => {
    if (activatorRef.value) return activatorRef.value

    const target = props.internalActivator ?
      (props.activator?.$el || props.activator) : document

    if (props.inputActivator) {
      return (activatorRef.value = target.querySelector(props.inputActivator))
    }

    if (props.activator) {
      if (typeof props.activator === 'string') {
        return (activatorRef.value = target.querySelector(props.activator))
      }

      if (props.activator.$el) {
        return (activatorRef.value = props.activator.$el)
      }

      return (activatorRef.value = props.activator)
    }

    if (e) {
      return (activatorRef.value = (e.target || e.currentTarget) as HTMLElement)
    }

    return null
  }

  const getActivatorSizes = () => {
    const el = activatorRef.value!.$el || activatorRef.value!

    activatorSizes.left = el.offsetLeft
    activatorSizes.top = el.offsetTop
    activatorSizes.height = el.offsetHeight
    activatorSizes.width = el.offsetWidth

    return activatorSizes
  }

  const genActivatorListeners = (props, handlers) => {
    if (props.openOnHover) {
      listeners.mouseenter = (e) => handlers.mouseenter(e)
      listeners.mouseleave = (e) => handlers.mouseleave(e)
    }

    if (props.openOnClick) {
      listeners.click = (e) => handlers.click(e)
    }

    if (props.openOnContextmenu) {
      listeners.contextmenu = (e) => handlers.contextmenu(e)
    }

    return listeners
  }

  const addActivatorEvents = () => {
    const events = Object.keys(listeners)

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
