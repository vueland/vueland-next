interface HTMLExpandElement extends HTMLElement {
  _parent?: (Node & ParentNode & HTMLElement) | null
  _initialStyle?: {
    transition: string
    overflow: string
    height?: string | null
    width?: string | null
  }
}

export function upperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const expandAnimation = (expandedParentClass: string, x: boolean = false) => {
  const sizeProperty = x ? 'width' : 'height' as 'width' | 'height'
  const offsetProperty = `offset${upperFirst(sizeProperty)}` as 'offsetHeight' | 'offsetWidth'

  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode as (Node & ParentNode & HTMLElement) | null
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      }
      console.log(el._initialStyle, 'before')
    },

    onEnter(el: HTMLExpandElement) {
      const initialStyle = el._initialStyle!
      el.style.setProperty('transition', 'none', 'important')

      el.style.overflow = 'hidden'

      const offset = `${el[offsetProperty]}px`

      el.style[sizeProperty] = '0'

      el.style.transition = initialStyle.transition

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass)
      }

      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset
      })
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,

    onLeave(el: HTMLExpandElement) {
      el._initialStyle = {
        transition: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      }

      el.style.overflow = 'hidden'
      el.style[sizeProperty] = `${el[offsetProperty]}px`

      requestAnimationFrame(() => (el.style[sizeProperty] = '0'))
    },

    onAfterLeave,
    onLeaveCancelled: onAfterLeave,
  }

  function onAfterLeave(el: HTMLExpandElement) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass)
    }
    resetStyles(el)
  }

  function resetStyles(el: HTMLExpandElement) {
    const size = el._initialStyle![sizeProperty]
    el.style.overflow = el._initialStyle!.overflow
    if (size != null) el.style[sizeProperty] = size
    delete el._initialStyle
  }
}