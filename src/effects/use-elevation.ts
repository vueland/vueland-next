// Vue API
import { computed, ComputedRef } from 'vue'

// Types
import { Props } from '../types'

type Elevetable = {
  elevationClasses: ComputedRef<Record<string, boolean>>
};

export function elevationProps(): Props {
  return {
    elevation: [String, Number],
  }
}

export function useElevation(props: Props): Elevetable {
  const elevationClasses = computed(() => {
    return {
      [`elevation-${props.elevation}`]: !!props.elevation,
    }
  })

  return { elevationClasses }
}
