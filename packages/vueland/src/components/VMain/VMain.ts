import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'v-main',
  setup(_, { slots }) {
    return () => h('div', {
      class: 'v-main',
    }, {
      default: () => slots.default?.(),
    })
  },
})
