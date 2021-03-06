// Vue API
import { ref, watch } from 'vue'

// Types
import { Ref } from 'vue'

type Toggleable = {
  isActive: Ref<boolean>
}

/***
 *
 * @param props {object} - props object of the component
 * @param propName {string} - the prop name which is tracked for changes
 */

export function useToggle(props: any, propName?: string): Toggleable {
  const isActive = ref<boolean>(false)
  const prop = propName ? propName : 'modelValue'

  watch(
    () => props[prop],
    (to) => (isActive.value = !!to),
    { immediate: true }
  )

  return {
    isActive,
  }
}
