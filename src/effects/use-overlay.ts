// Components
import { VOverlay } from '../components'
// Types
import { Props } from '../types'

// Types
// import { SetupContext } from 'vue'

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
    const propsObject = {
      active: props.overlay,
      hide: !props.overlay,
      opacity: props.overlayOpacity,
      color: props.overlayColor,
    }

    VOverlay.props = propsObject

    // @ts-ignore
    return VOverlay.setup!(propsObject) as Props
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
