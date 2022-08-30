import { inject, toRefs } from 'vue'

export const useBreakpoints = () => {
  const breakpoints = inject('$v_breakpoints', {})

  return {
    ...toRefs(breakpoints)
  }
}
