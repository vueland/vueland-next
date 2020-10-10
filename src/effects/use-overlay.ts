// Vue API
import { ref, DefineComponent, Ref } from 'vue'

// Components
import { VOverlay } from '../components'

// Types
import { Props } from '../types'

export function overlayProps(): Props {
  return {
    overlay: Boolean,
    overlayOpacity: [Number, String],
    overlayColor: {
      type: String,
      default: () => {
        return 'white--base'
      },
    },
  }
}

interface Overlayable {
  createOverlay: () => void
  removeOverlay: () => void
}

export function useOverlay(props: Props): Overlayable {
  const overlayComponent: Ref = ref<DefineComponent<typeof VOverlay> | null>(
    null,
  )

  const hideOverlay: Ref = ref<boolean>(true)

  const createOverlay = (): void => {
    overlayComponent.value = VOverlay
    console.log(overlayComponent.value, props)
  }

  const removeOverlay = (): void => {
    if (overlayComponent) {
      hideOverlay.value = false
    }
  }

  return {
    createOverlay,
    removeOverlay,
  }
}
