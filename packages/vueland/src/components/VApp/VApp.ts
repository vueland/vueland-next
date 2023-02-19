import {
  h,
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'v-app',
  setup(_, { slots }) {
    const genAppWrapper = () => h('div', { class: 'v-app--wrapper' }, {
      default: () => slots.default && slots.default(),
    })

    return () => h('div', { class: 'v-app' }, genAppWrapper())
  },
})
