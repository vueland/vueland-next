import {
  h,
  defineComponent,
  onMounted,
  provide,
  ref,
  reactive,
  unref,
  withDirectives,
} from 'vue'

// Directives
import { resize } from '../../directives'

// Services
import { breakpoints } from '../../services/breakpoints'

// Utils
import { throttle } from '../../utils/throttle'

// Types

interface AppBreakpoints {
  current: Maybe<'xl' | 'lg' | 'md' | 'sm'>
  xlAndLess: boolean
  lgAndLess: boolean
  mdAndLess: boolean
  smAndLess: boolean
}

export default defineComponent({
  name: 'v-app',
  directives: {
    resize,
  },
  props: {
    global: {
      type: Object,
      default: null,
    },
  },
  setup(props, { slots }) {
    const TIMEOUT = 20

    const state = ref<AppBreakpoints>({
      current: null,
      xlAndLess: false,
      lgAndLess: false,
      mdAndLess: false,
      smAndLess: false,
    })

    provide('$v_breakpoints', reactive(unref(state)))

    const setCurrentBreakpoint = (screen) => {
      if (screen >= breakpoints.xl) {
        return (unref(state).current = 'xl')
      }

      if (
        screen >= breakpoints.lg
        && screen < breakpoints.xl
      ) {
        return (unref(state).current = 'lg')
      }

      if (
        screen >= breakpoints.md
        && screen < breakpoints.lg
      ) {
        return (unref(state).current = 'md')
      }

      if (
        screen >= breakpoints.sm
        && screen < breakpoints.md
      ) {
        return (unref(state).current = 'sm')
      }

      return (unref(state).current = 'sm')
    }

    const setIntervals = (screen) => {
      const { xl, lg, md, sm } = breakpoints

      unref(state).xlAndLess = screen <= xl && screen > lg
      unref(state).lgAndLess = screen <= lg && screen > md
      unref(state).mdAndLess = screen <= md && screen > sm
      unref(state).smAndLess = screen <= sm
    }

    const setSizes = () => {
      const { innerWidth } = props.global || window

      setCurrentBreakpoint(innerWidth)
      setIntervals(innerWidth)
    }

    const genAppWrapper = () => {
      return h('div', { class: 'v-app--wrapper' }, {
        default: () => slots.default && slots.default(),
      })
    }

    const throttledResizeListener = throttle(setSizes, TIMEOUT)

    onMounted(() => setSizes())

    return () =>
      withDirectives(
        h('div', { class: 'v-app' }, genAppWrapper()),
        [ [ resize, throttledResizeListener ] ],
      )
  },
})
