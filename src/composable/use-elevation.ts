// Vue API
import { computed, ComputedRef } from 'vue'

type Elevetable = {
  elevationClasses: ComputedRef<Record<string, boolean>>
};

export function elevationProps() {
  return {
    elevation: [String, Number],
  }
}

export function useElevation(props: any): Elevetable {
  const elevationClasses = computed(() => {
    return {
      [`elevation-${props.elevation}`]: !!props.elevation,
    }
  })

  return { elevationClasses }
}
