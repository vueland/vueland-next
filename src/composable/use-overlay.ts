import { render, h } from 'vue'

// Components
import { VOverlay } from '../components/VOverlay'
import { Maybe } from '../../types/base'

// Helpers
import { addOnceListener } from '../helpers'

interface OverlayController {
  createOverlay: () => void
  removeOverlay: () => void
}

export const overlayProps = () => ({
  overlay: Boolean,
  overlayColor: {
    type: String,
    default: '#000000'
  }
})

export function useOverlay(props: any, overlayOn?: HTMLElement): OverlayController {
  const container = document.createElement('div')

  let overlayElement: Maybe<HTMLElement> = null

  const renderOverlay = () => render(h(VOverlay, {
    active: false,
    color: props.overlayColor
  }), container!)

  const createOverlay = () => {
    overlayElement!.style.zIndex = '99'
    overlayOn!.style.zIndex = '100'

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

  renderOverlay()
  overlayElement = container.firstChild as HTMLElement

  return {
    createOverlay,
    removeOverlay
  }
}
