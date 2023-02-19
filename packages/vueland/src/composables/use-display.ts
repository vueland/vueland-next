import { breakpoints } from '../services/breakpoints'
import { reactive, ref, unref, watchEffect, toRefs } from 'vue'
import { IN_BROWSER } from '../utils/globals'

interface AppBreakpoints {
  xxl: boolean
  xl: boolean
  lg: boolean
  md: boolean
  sm: boolean
  xs: boolean
  xlAndLess: boolean
  lgAndLess: boolean
  mdAndLess: boolean
  smAndLess: boolean
  xlAndUp: boolean
  lgAndUp: boolean
  mdAndUp: boolean
  smAndUp: boolean
}

export const useDisplay = () => {
  const state = reactive<AppBreakpoints>({
    xxl: false,
    xl: false,
    lg: false,
    md: false,
    sm: false,
    xs: false,
    xlAndLess: false,
    lgAndLess: false,
    mdAndLess: false,
    smAndLess: false,
    xlAndUp: false,
    lgAndUp: false,
    mdAndUp: false,
    smAndUp: false
  })

  const createDisplay = (ssr: boolean = false) => {
    const getClientWidth = (isSSR = false) => {
      return IN_BROWSER && !isSSR ? window.innerWidth : 0
    }

    const getClientHeight = (isSSR = false) => {
      return IN_BROWSER && !isSSR ? window.innerHeight : 0
    }

    const width = ref(getClientWidth(ssr))
    const height = ref(getClientHeight(ssr))

    const update = () => {
      width.value = getClientWidth()
      height.value = getClientHeight()
    }

    watchEffect(() => {
      const { xxl, xl, lg, md, sm, xs } = breakpoints
      const screen = unref(width)

      state.xs = screen < sm
      state.sm = screen < md && screen > xs
      state.md = screen < lg && screen > sm
      state.lg = screen < xl && screen > md
      state.xl = screen < xxl && screen > lg
      state.xxl = screen >= xxl
      state.xlAndUp = !(state.xs || state.sm || state.md || state.lg)
      state.lgAndUp = !(state.xs || state.sm || state.md)
      state.mdAndUp = !(state.xs || state.sm)
      state.smAndUp = !state.xs
      state.xlAndLess = screen <= xl && screen > lg
      state.lgAndLess = screen <= lg && screen > md
      state.mdAndLess = screen <= md && screen > sm
      state.smAndLess = screen <= sm && screen > xs
    })

    if (IN_BROWSER) {
      window.addEventListener('resize', update, { passive: true })
    }

    return {
      ...toRefs(state),
      update,
    }
  }

  return {
    state,
    createDisplay
  }
}
