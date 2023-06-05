import { ShallowRef, render, h, unref } from 'vue'

// Components
import { VOverlay } from '../components/VOverlay'

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

export const useOverlay = (props: any, overlayOn?: ShallowRef<Maybe<HTMLElement>>): OverlayController => {
  const container: HTMLElement = document.createElement('div')

  let overlayElement: Maybe<HTMLElement> = null

  const renderOverlay = () => render(
    h(VOverlay, { active: false, color: props.overlayColor }),
    container!
  )

  const createOverlay = () => {
    overlayElement!.style.zIndex = `${ props.zIndex - 1 }`
    unref(overlayOn)!.style.zIndex = `${ props.zIndex }`

    unref(overlayOn)?.parentNode?.insertBefore(overlayElement!, unref(overlayOn)!)
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
