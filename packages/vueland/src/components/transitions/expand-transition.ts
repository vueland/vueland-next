interface InitialStyles {
  transition: string | null;
  propSize: string;
  height?: number;
  width?: number;
}

const init: InitialStyles = {
  transition: null,
  propSize: '',
  height: 0,
  width: 0
}

const PRIMARY_TRANSITION = 'cubic-bezier(.25, .8, .5, 1)'

const resetStyles = (el) => {
  el.style[init.propSize] = ''
  el.style.transition = ''
}

const getChildrenSizes = (el) => {
  return Array.prototype.reduce.call(
    el.children,
    (acc: number, it: HTMLElement) => {
      const size = getComputedStyle(it)[init.propSize]

      return (acc += parseFloat(size))
    }, 0) as number
}

const setInitStyles = (el,x) => {
  init.propSize = x ? 'width' : 'height'
  init.transition = getComputedStyle(el).transition
  init[init.propSize] = getChildrenSizes(el)
}

export const expandHooks = (
  expandedParentClass: string,
  x: boolean = false
) => {
  return {
    onBeforeEnter(el) {
      el.style.transition = ''
    },

    onEnter(el) {
      setInitStyles(el, x)
      el.style[init.propSize] = '0'
      el.style.transition = `.2s ${ init.propSize } ${ PRIMARY_TRANSITION }`

      requestAnimationFrame(() => {
        el.style[init.propSize] = `${ init[init.propSize] }px`
      })

      if (expandedParentClass) {
        el.parentNode.classList.add(expandedParentClass)
      }
    },

    onAfterEnter(el) {
      el.parentNode.classList.remove(expandedParentClass)
      resetStyles(el)
    },

    onBeforeLeave(el) {
      setInitStyles(el, x)
    },

    onLeave(el) {
      setInitStyles(el, x)

      el.style.transition = `.2s ${ init.propSize } ${ PRIMARY_TRANSITION }`
      el.style[init.propSize] = `${ init[init.propSize] }px`
      requestAnimationFrame(() => (el.style[init.propSize] = '0'))
    },

    onAfterLeave(el) {
      requestAnimationFrame(() => resetStyles(el))
    }
  }
}
