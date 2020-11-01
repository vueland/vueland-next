import { render } from 'vue'

// Components
import { VOverlay } from '../components'

// Types
import { Props } from '../types'

// Helpers
// import { addOnceListener } from '@/helpers'

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

export function useOverlay(props: Props, overlayOn?: string): Overlayable {

  const doc = document
  const container = doc.createElement('div')
  container.id = 'overlay'

  let usedWith

  setTimeout(() => {
    usedWith = !!overlayOn && doc.querySelector(overlayOn)
  })

  const propsObject: Props = {
    active: false,
    hide: true,
    color: props.overlayColor
  }

  // @ts-ignore
  const overlayVNode = () => VOverlay.setup!(propsObject)

  const renderOverlay = vnode => render(vnode, container! as Element)

  renderOverlay(overlayVNode())

  function createOverlay() {
    usedWith.parentNode.appendChild(container)

    setTimeout(() => {
      propsObject.active = true
      propsObject.hide = !props.overlay
      renderOverlay(overlayVNode())
    }, 10)

    renderOverlay(overlayVNode())
  }

  function removeOverlay(): void {
    const overlay = doc.querySelector('.v-overlay')
    overlay!.classList.remove('v-overlay--active')

    function remove() {
      propsObject.active = false
      overlay!.removeEventListener('transitionend', remove)

      renderOverlay(null)
      // setTimeout(() => container!.parentNode!.removeChild(container!))
    }

    overlay!.addEventListener('transitionend', remove)
  }

  return {
    createOverlay,
    removeOverlay,
  }
}
