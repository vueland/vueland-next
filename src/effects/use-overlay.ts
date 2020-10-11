import { SetupContext } from 'vue'

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
        return 'white'
      },
    },
  }
}

interface Overlayable {
  createOverlay: () => void
  removeOverlay: () => void
}

export function useOverlay(props: Props): Overlayable {
  const createOverlay = (): any => {
    const propsObject: Record<string, boolean> = {
      active: props.overlay,
      hide: !props.overlay,
      opacity: props.overlayOpacity,
      color: props.overlayColor,
    }

    return VOverlay.setup!(propsObject, {} as SetupContext)
  }

  const removeOverlay = (): void => {
    // if (props.overlay) {
    // }
  }

  return {
    createOverlay,
    removeOverlay,
  }
}
