export const expandHooks = (expandedParentClass: string, x: boolean = false) => {
  let children
  let styles
  let unit
  let parentHeight
  let propSize

  const resetStyles = el => {
    el.parentNode.style[propSize] = ''
  }

  return {
    onBeforeEnter(el) {
      propSize = x ? 'width' : 'height'
      children = el.childNodes.length
      styles = getComputedStyle(el.childNodes[0])
      parentHeight = parseFloat(getComputedStyle(el.parentNode)[propSize])
      unit = parseFloat(styles[propSize])
    },

    onEnter(el) {
      if (expandedParentClass && el._parent) {
        el.parentNode.classList.add(expandedParentClass)
      }

      requestAnimationFrame(() => {
        el.parentNode.style[propSize] = ((children * unit) + parentHeight) + 'px'
      })
    },

    // onAfterEnter(el) {
    //
    // },

    onLeave(el) {
      resetStyles(el)
    },
  }
}
