import { ref } from 'vue'

function clickHandler(e, el, binding) {
  if (e.target === el) return
  if (typeof binding.value === 'function') binding.value()
  if (typeof binding.value === 'object') binding.value.handler()
}

const binds = ref(null)

export const clickOutside = {

  mounted(el, binding) {
    if (binding.value?.handler) binds.value = binding

    el._onClick = e => clickHandler(e, el, binds.value ? binds : binding)
    document.body.addEventListener('click', el._onClick, true)
  },

  beforeUpdate(_, { value }) {
    binds.value = value
  },

  beforeUnmount(el) {
    document.body.removeEventListener('click', el._onClick, true)
    delete el._onClick
  },
}
