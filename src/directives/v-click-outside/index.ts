function clickHandler(e, el) {
  if (el.contains(e.target) &&
    el._binds.value &&
    !el._binds.value.closeConditional
  ) return

  if (typeof el._binds.value === 'function') el._binds.value()

  if (typeof el._binds.value === 'object') el._binds.value.handler()
}

function removeListener(el) {
  document.body.removeEventListener('click', el._onClick, true)
  delete el._onClick
  delete el._binds
}

export const clickOutside = {

  beforeMount(el, binding) {
    el._binds = binding
  },

  mounted(el) {
    el._onClick = e => clickHandler(e, el)
    document.body.addEventListener('click', el._onClick, true)
  },

  beforeUpdate(el, binding) {
    el._binds = binding
  },

  beforeUnmount(el) {
    removeListener(el)
  },
}
