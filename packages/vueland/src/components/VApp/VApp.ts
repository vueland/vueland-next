import {
  h,
  defineComponent,
  provide,
  reactive,
  unref,
  withDirectives,
  onMounted,
} from 'vue'

// Directives
import { resize } from '../../directives'

// Services
import { useDisplay } from '../../composables/use-display'

export default defineComponent({
  name: 'v-app',
  directives: {
    resize,
  },
  setup(_, { slots }) {
    const { state, setSizes } = useDisplay()

    provide('$v_breakpoints', reactive(unref(state)))

    const genAppWrapper = () => {
      return h('div', { class: 'v-app--wrapper' }, {
        default: () => slots.default && slots.default(),
      })
    }

    onMounted(() => setSizes())

    return () =>
      withDirectives(
        h('div', { class: 'v-app' }, genAppWrapper()),
        [ [ resize, setSizes ] ],
      )
  },
})
