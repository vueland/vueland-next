export function useDetach() {
  let target
  const setDetached = (el: HTMLElement, selector: string = '') => {
    if (selector) target = document.querySelector(selector)
    if (!selector) target = document.querySelector('.v-app')
    if (!target) target = document.querySelector('#app')
    if (!target) target = document.querySelector('body')

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
