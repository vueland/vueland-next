// Vue API
import { ref, watch } from 'vue'

// Types
import { Props } from '../types'
import { Ref } from 'vue'

type Toggleable = {
  isActive: Ref<boolean>
}

export function toggleProps(): Props {
  return {
    modelValue: [String, Boolean, Number]
  }
}

export function useToggle(props: Props): Toggleable {
  const isActive = ref(false)

  watch(() => props.modelValue, to => {
    isActive.value = !!to
  }, { immediate: true })

  return {
    isActive
  }
}
