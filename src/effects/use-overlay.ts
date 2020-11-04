import { render } from 'vue'

// Components
import { VOverlay } from '../components'

// Types
import { Props } from '../types'
import { SetupContext } from 'vue'

// Helpers
import { addOnceListener } from '@/helpers'

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

  let overlayable

  requestAnimationFrame(() => {
    overlayable = !!overlayOn && doc.querySelector(`.${overlayOn}`)
  })

  const overlayPropsObject: Props = {
    active: false,
    hide: true,
    color: props.overlayColor,
  }

  const container = doc.createElement('div')

  const overlayVNode = () =>
    VOverlay.setup!(
      overlayPropsObject as typeof VOverlay.props,
      {} as SetupContext,
    )

  const renderOverlay = vNode => render(vNode, container!)

  renderOverlay(overlayVNode())

  const overlayElement = container.firstChild

  function createOverlay() {
    overlayable.parentNode.insertBefore(overlayElement, overlayable)

    setTimeout(() => {
      overlayPropsObject.active = true
      overlayPropsObject.hide = !props.overlay
      renderOverlay(overlayVNode())
    }, 40)
  }

  function removeOverlay(): void {
    overlayPropsObject.active = false

    renderOverlay(overlayVNode())

    function remove() {
      overlayable.parentNode.removeChild(overlayElement)
    }

    addOnceListener(overlayElement!, 'transitionend', remove)
  }

  return {
    createOverlay,
    removeOverlay,
  }
}
