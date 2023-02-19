import { breakpoints } from '../services/breakpoints'
import { ref, unref } from 'vue'

interface AppBreakpoints {
  current: Maybe<'xl' | 'lg' | 'md' | 'sm'>
  xlAndLess: boolean
  lgAndLess: boolean
  mdAndLess: boolean
  smAndLess: boolean
}

export const useDisplay = () => {
  const state = ref<AppBreakpoints>({
    current: null,
    xlAndLess: false,
    lgAndLess: false,
    mdAndLess: false,
    smAndLess: false,
  })

  const IN_BROWSER = typeof window !== 'undefined'

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
    const innerWidth = IN_BROWSER ? window.innerWidth : 0

    setCurrentBreakpoint(innerWidth)
    setIntervals(innerWidth)
  }

  return {
    state,
    setCurrentBreakpoint,
    setIntervals,
    setSizes
  }
}
