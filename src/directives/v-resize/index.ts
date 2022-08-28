import { DirectiveBinding } from 'vue'

interface ResizeVNodeDirective extends DirectiveBinding {
  value: () => void
  options: boolean | AddEventListenerOptions
}

export const vResize = {
  mounted(el: HTMLElement & any, binding: ResizeVNodeDirective) {
    const callback = binding.value!
    const options = binding.options || { passive: true }

    window.addEventListener('resize', callback, options)

    el._onResize = {
      callback,
      options
    }
    if (!binding.modifiers || !binding.modifiers.quiet) {
      callback()
    }
  },

  beforeUnmount(el) {
    if (!el._onResize) return

    const { callback, options } = el._onResize
    window.removeEventListener('resize', callback, options)
    delete el._onResize
  }
}
