let childs = 0
const unit = 38

export const expander = {
  onBeforeEnter(el) {
    el._parent = el.parentNode
    childs = el.childNodes.length
    el._initStyles = {
      height: el.style.height
    }
  },

  onEnter(el) {
    el.parentNode.style.height = (childs * unit) + 'px'
  },

  onLeave(el) {
    el.parentNode.style.height = unit + 'px'
  },

  onAfterEnter(el){
    el.style.display = ''
  }
}