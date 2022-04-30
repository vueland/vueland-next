import { defineComponent, h } from 'vue'

export const VMain = defineComponent({
  name: 'v-main',
  setup(_, { slots }) {
    return () => h('div', {
      class: 'v-main',
    }, {
      default: () => slots.default?.(),
    })
  },
})
