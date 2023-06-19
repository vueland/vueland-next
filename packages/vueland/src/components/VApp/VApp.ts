import {
  computed,
  defineComponent,
  h,
  unref
} from 'vue'

export default defineComponent({
  name: 'v-app',
  setup(_, { slots }) {
    const genAppWrapper = () => h('div', { class: 'v-app__wrapper' }, {
      default: () => slots.default && slots.default(),
    })

    const classes = computed(() => ({
      'v-app': true,
    }))

    return () => h('div', { class: unref(classes) }, genAppWrapper())
  },
})
