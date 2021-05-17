export function useDetachable() {
  let target
  const setDetached = (el: HTMLElement, selector: string = '') => {
    if (selector) target = document.querySelector(selector)
    else if (!selector) target = document.querySelector('.v-app')
    if (!target) target = document.querySelector('[data-v-app]')

    target.appendChild(el)
  }

  const removeDetached = (el: HTMLElement) => {
    target.removeChild(el)
  }

  return {
    setDetached,
    removeDetached,
  }
}
