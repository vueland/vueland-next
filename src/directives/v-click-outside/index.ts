function clickHandler(e, el, binding) {
  const isContain = [].includes.call(el.children, e.target as never)

  if (isContain || e.target === el) return
  if (typeof binding.value === 'function') binding.value()
  if (typeof binding.value === 'object') binding.value.handler()
}

function removeListener(el) {
  document.body.removeEventListener('click', el._onClick, true)
  delete el._onClick
}

export const clickOutside = {

  mounted(el, binding) {
    el._onClick = e => clickHandler(e, el, el._binds ? el._binds : binding)
    document.body.addEventListener('click', el._onClick, true)
  },

  beforeUpdate(el, binding) {
    el._binds = binding
  },

  beforeUnmount(el) {
    removeListener(el)
  },
}
