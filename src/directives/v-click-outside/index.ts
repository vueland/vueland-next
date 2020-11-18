import { ref } from 'vue'

function clickHandler(e, el, binding) {
  if (e.target === el) return
  binding.value && binding.value.handler()
}

const binds = ref(null)

export const VClickOutside = {
  mounted(el) {
    el._onClick = (e) => clickHandler(e, el, binds)
    document.body.addEventListener('click', el._onClick, true)
  },

  beforeUpdate(_, { value }) {
    binds.value = value
  },

  beforeUnmount(el) {
    document.body.removeEventListener('click', el._onClick, true)
    delete el._onClick
  }
}
