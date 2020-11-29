const resetStyles = el => {
  el.style.opacity = ''
  el.style.transform = ''
}

export const scaleInHooks = (scaleInParentClass: string) => {
  return {
    onBeforeEnter() {
      // console.log(el.parentNode)
      // el.parentNode.classList.add(scaleInParentClass)
    },

    onEnter(el) {
      el.style.opacity = '0'
      el.style.transform = 'scale(.4)'
      el.style.transition = 'all .2s ease'

      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'scale(1)'
      })
    },

    onAfterEnter(el) {
      resetStyles(el)
      el.parentNode.classList.remove(scaleInParentClass)
    },

    onBeforeLeave(el) {
      el.parentNode.classList.add(scaleInParentClass)
    },

    onLeave(el) {
      el.style.opacity = '1'

      requestAnimationFrame(() => {
        el.style.opacity = '0'
      })
    },

    onAfterLeave(el) {
      resetStyles(el)
      el.parentNode.classList.remove(scaleInParentClass)
    },
  }
}
