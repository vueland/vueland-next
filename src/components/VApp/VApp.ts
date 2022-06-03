import {
  defineComponent,
  provide,
  reactive,
  h,
  withDirectives,
  onMounted,
} from 'vue'

// Directives
import { resize } from '../../directives'

// Services
import { breakpoints } from '../../services/breakpoints'

// Utils
import { throttle } from '../../utils/thottle'

// Types
import { Maybe } from '../../../types/base'

interface AppState {
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
    const THROTTLING_TIMEOUT = 60

    const state = reactive<AppState>({
      current: null,
      xlAndLess: false,
      lgAndLess: false,
      mdAndLess: false,
      smAndLess: false,
    })

    provide('breakpoints', state)

    const setCurrentBreakpointName = (screen) => {
      if (screen >= breakpoints.xl) {
        return (state.current = 'xl')
      }
      if (screen >= breakpoints.lg && screen < breakpoints.xl) {
        return (state.current = 'lg')
      }
      if (screen >= breakpoints.md && screen < breakpoints.lg) {
        return (state.current = 'md')
      }
      if (screen >= breakpoints.sm && screen < breakpoints.md) {
        return (state.current = 'sm')
      }

      return null
    }

    const setIntervals = (screen) => {
      const { xl, lg, md, sm } = breakpoints

      state.xlAndLess = screen <= xl && screen > lg
      state.lgAndLess = screen <= lg && screen > md
      state.mdAndLess = screen <= md && screen > sm
      state.smAndLess = screen <= sm
    }

    const setSizes = () => {
      // the "global" prop allows to test the
      // component without using mockups
      const screen = props.global?.innerWidth || window.innerWidth

      setCurrentBreakpointName(screen)
      setIntervals(screen)
    }

    const throttledResizeListener = throttle(
      setSizes,
      THROTTLING_TIMEOUT,
    ) as () => void

    const genAppWrapper = () => {
      return h('div', { class: 'v-app--wrapper' }, {
        default: () => slots.default && slots.default(),
      })
    }

    onMounted(() => {
      setSizes()
    })

    return () =>
      withDirectives(
        h('div', { class: 'v-app' }, genAppWrapper()),
        [[resize, throttledResizeListener]],
      )
  },
})
