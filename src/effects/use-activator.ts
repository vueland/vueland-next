import { ref } from 'vue'

type ActivatorSizes = {
  offsetLeft: number
  offsetTop: number
  offsetWidth: number
  offsetHeight: number
}

export function useActivator() {

  const activatorRef = ref<HTMLElement | null>(null)
  const activatorSizes: Partial<ActivatorSizes> = {}

  const setActivatorSizes = () => {
    if (activatorRef.value) {
      activatorSizes.offsetLeft = activatorRef.value.offsetLeft
      activatorSizes.offsetTop = activatorRef.value.offsetTop
      activatorSizes.offsetHeight = activatorRef.value.offsetHeight
      activatorSizes.offsetWidth = activatorRef.value.offsetWidth
    }

    return { activatorSizes }
  }


  return {
    activatorRef,
    setActivatorSizes,
  }
}