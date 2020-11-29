const resetStyles = el => {
  el.style.opacity = ''
}

export const fadeHooks = (fadeParentClass: string) => {
  return {
    onBeforeEnter(el) {
      el.parentNode.classList.add(fadeParentClass)
    },

    onEnter(el) {
      el.style.opacity = '0'
      requestAnimationFrame(() => el.style.opacity = '1')
    },

    onAfterEnter(el) {
      resetStyles(el)
      el.parentNode.classList.remove(fadeParentClass)
    },

    onBeforeLeave(el) {
      el.parentNode.classList.add(fadeParentClass)
    },

    onLeave(el) {
      el.style.opacity = '1'
      requestAnimationFrame(() => {
        el.style.opacity = '0'
      })
    },

    onAfterLeave(el) {
      resetStyles(el)
      el.parentNode.classList.remove(fadeParentClass)
    },
  }
}
