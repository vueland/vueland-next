// Vue API
import { ref, watch, SetupContext } from 'vue'

// Types
import { Props } from '../types'

type Toggleable = {}

export function toggleProps(): Props {
  return {
    value: Boolean,
  }
}

export function useToggle(props: Props, context: SetupContext): Toggleable {
  console.log(props, context)
  return {}
}

export function factory(
  prop = 'value',
  event = 'input',
  emit: (event: string, val: any) => void,
) {
  const isActive = ref(false)
  const model = { prop, event }

  watch([prop], val => (isActive.value = !!val))
  watch(isActive, val => {
    !!val !== isActive.value && emit(event, val)
  })

  return {
    model,
    isActive,
  }
}
