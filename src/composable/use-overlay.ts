import { render } from 'vue'

// Components
import { VOverlay } from '../components/VOverlay'

// Types
import { SetupContext, VNode } from 'vue'

// Helpers
import { addOnceListener } from '../helpers'
import { Maybe } from '../../types/base'

interface OverlayController {
  createOverlay: () => void
  removeOverlay: () => void
}

export function overlayProps() {
  return {
    overlay: Boolean,
    overlayColor: {
      type: String,
      default: '#000000',
    },
  }
}

export function useOverlay(props: any, overlayOn?: Element): OverlayController {
  const container = document.createElement('div')

  const overlayProps = {
    active: false,
    color: props.overlayColor,
  }

  let overlayElement: Maybe<HTMLElement> = null

  const overlayVNode = () => {
    return VOverlay.setup!(
      overlayProps as typeof VOverlay.props,
      {} as SetupContext,
    )
  }

  const renderOverlay = () => render(overlayVNode() as VNode, container!)

  renderOverlay()
  overlayElement = container.firstChild as HTMLElement

  const createOverlay = () => {
    overlayOn?.parentNode?.insertBefore(overlayElement!, overlayOn)
    overlayElement?.classList.remove('v-overlay--hidden')

    requestAnimationFrame(() => {
      overlayElement?.classList.add('v-overlay--active')
    })
  }

  const removeOverlay = () => {
    overlayElement!.classList.remove('v-overlay--active')

    requestAnimationFrame(() => {
      overlayElement?.classList.add('v-overlay--hidden')
    })

    const remove = () => {
      overlayElement?.parentNode?.removeChild(overlayElement!)
    }

    addOnceListener(overlayElement!, 'transitionend', remove)
  }

  return {
    createOverlay,
    removeOverlay,
  }
}
