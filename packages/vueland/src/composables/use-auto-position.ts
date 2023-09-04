import { reactive, ref } from 'vue'
import { Dimensions } from '../../types'
import { getScrollbarWidth } from '../helpers'

type AutoPositionDimensions = {
  activator: Dimensions
  content: Dimensions
}

export const autoPositionProps = () => ({
  positionX: {
    type: Number,
    default: 0,
  },
  positionY: {
    type: Number,
    default: 0,
  },
})

export const useAutoPosition = (props) => {
  const app = document.querySelector('.v-app')!

  const dimensions = reactive<AutoPositionDimensions>({
    activator: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
    },
    content: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
    },
  })

  const contentRef = ref<Maybe<HTMLElement>>(null)
  const offsetY: number = Number(props.offsetY)
  const offsetX: number = Number(props.offsetX)
  const EDGE_INDENT = props.edgeIndent || 20

  let activator: HTMLElement
  let content: HTMLElement

  const getRect = (el: HTMLElement) => {
    const {
      top,
      left,
      bottom,
      right,
      width,
      height,
    } = el.getBoundingClientRect()

    return {
      top,
      left,
      bottom,
      right,
      width,
      height,
    }
  }

  const getInnerHeight = (): number => {
    if (!window) return 0

    return innerHeight || document.documentElement.clientHeight
  }

  const getInnerWidth = () => {
    if (!window) return 0

    return innerWidth || document.documentElement.clientWidth
  }

  const getScrollTop = (): number => {
    if (!window) return app.scrollTop

    return pageYOffset || app.scrollTop
  }

  const getScrollLeft = (): number => {
    if (!window) return app.scrollLeft

    return pageXOffset || app.scrollLeft
  }

  const getContentAbsoluteTopCoords = () => props.positionY + getScrollTop()

  const getContentAbsoluteBottomCoords = () => getContentAbsoluteTopCoords() + dimensions.content.height

  const getContentAbsoluteLeftCoords = () => props.positionX + getScrollLeft()

  const getContentAbsoluteRightCoords = () => getContentAbsoluteLeftCoords() + dimensions.content.width

  const getActivatorTopCoords = () => dimensions.activator.top

  const getActivatorBottomCoords = () => getActivatorTopCoords() + dimensions.activator.height

  const getActivatorLeftCoords = () => dimensions.activator.left

  const getContentBottomCoords = () => getActivatorTopCoords() + dimensions.content.height

  const getPageYPosition = () => getScrollTop() + getInnerHeight()

  const getPageXPosition = () => getScrollLeft() + getInnerWidth()

  const calcAbsoluteTop = () => {
    const top = getContentAbsoluteTopCoords()

    return top + offsetY
  }

  const calcAbsoluteBottom = () => {
    const bottom = getContentAbsoluteBottomCoords()

    return bottom + offsetY
  }

  const calcContentAbsoluteLeft = () => {
    const left = getContentAbsoluteLeftCoords()

    return left + offsetX
  }

  const calcContentAbsoluteRight = () => {
    const right = getContentAbsoluteRightCoords()

    return right + offsetX
  }

  const calcContentToActivatorTop = () => {
    const { activator, content } = dimensions

    return activator.top - content.height - offsetY
  }

  const calcContentLeft = () => {
    const { activator, content } = dimensions

    return activator.left - content.width - offsetX
  }

  const calcContentRight = () => {
    const { activator, content } = dimensions

    return activator.right + content.width + offsetX
  }

  const setContentAutoTop = ({
    top: activatorTop,
    bottom: contentBottom,
  }): number => {
    const pageYPosition = getPageYPosition()
    const diffY = (contentBottom + offsetY) - pageYPosition
    /**
     * if props bottom is in true and content bottom
     * border crossed bottom edge of screen
     */
    if (diffY > 0 || diffY >= getInnerHeight()) {
      return activatorTop - diffY - EDGE_INDENT
    }

    return activatorTop + offsetY
  }

  const getContentAbsoluteTop = ({ top, bottom }): number => {
    const pageYPosition = getPageYPosition()
    const { content } = dimensions

    /** if content crossed bottom edge of screen */
    if (bottom + offsetY >= pageYPosition) {
      return pageYPosition - EDGE_INDENT - content.height
    }

    /** if content crossed top edge of screen */
    if (top - getScrollTop() + offsetY < EDGE_INDENT) {
      return getScrollTop() + EDGE_INDENT
    }

    return top
  }

  const setContentAbsoluteLeft = ({ left, right }): number => {
    const pageXPosition = getPageXPosition()
    const { content } = dimensions

    /** if the content crossed the right edge of the screen */
    if (right >= pageXPosition) {
      return getInnerWidth() - content.width - EDGE_INDENT - getScrollbarWidth()
    }

    /** if the content crossed the left edge of the screen */
    if (EDGE_INDENT >= left) {
      return EDGE_INDENT
    }

    return left
  }

  const setContentBottomToActivatorTop = (activatorTop: number): number => {
    const { content } = dimensions
    /**
     * if props top is in true and the content top
     * border crossed the top edge of the screen
     */
    if (content.height + getScrollTop() + offsetY > activatorTop) {
      return getActivatorBottomCoords() + offsetY
    }

    return activatorTop - content.height - offsetY
  }

  const setContentTopToActivatorBottom = (activatorTop: number): number => {
    const { content } = dimensions
    const pageYPosition = getPageYPosition()

    const diffY = activatorTop - pageYPosition + content.height + EDGE_INDENT
    /**
     * if props bottom is in true and the content bottom
     * border crossed the bottom edge of the screen
     */
    if (diffY > 0) {
      return calcContentToActivatorTop()
    }

    return activatorTop - offsetY
  }

  const setContentRightToActivatorLeft = ({ left, right }) => {
    if (EDGE_INDENT >= left) {
      return right
    }

    return left
  }

  const setContentLeftToActivatorRight = ({ left, right }) => {
    const pageXPosition = getPageXPosition()
    const diffX = right - pageXPosition

    if (diffX > 0) {
      return left
    }

    return right
  }

  const setContentAutoLeft = ({ left }) => {
    const {content} = dimensions
    const pageXPosition = getPageXPosition()

    const diffX = (left + content.width + offsetX) - pageXPosition

    if (diffX > 0) {
      return left - diffX - EDGE_INDENT - getScrollbarWidth()
    }

    return left
  }

  const calcPositionY = (): number => {
    if (props.absolute) {
      return getContentAbsoluteTop({
        top: calcAbsoluteTop(),
        bottom: calcAbsoluteBottom(),
      })
    }

    if (props.bottom) {
      return setContentTopToActivatorBottom(getActivatorBottomCoords())
    }

    if (props.top) {
      return setContentBottomToActivatorTop(getActivatorTopCoords())
    }

    return setContentAutoTop({
      top: getActivatorTopCoords(),
      bottom: getContentBottomCoords(),
    })
  }

  const calcPositionX = (): number => {
    if (props.absolute) {
      return setContentAbsoluteLeft({
        left: calcContentAbsoluteLeft(),
        right: calcContentAbsoluteRight(),
      })
    }

    if (props.left) {
      return setContentRightToActivatorLeft({
        left: calcContentLeft(),
        right: calcContentRight(),
      })
    }

    if (props.right) {
      return setContentLeftToActivatorRight({
        left: calcContentLeft(),
        right: calcContentRight(),
      })
    }

    return setContentAutoLeft({
      left: getActivatorLeftCoords(),
    })
  }

  const snapShot = (cb: () => any) => {
    requestAnimationFrame(() => {
      if (!content || content.style.display !== 'none') {
        return cb()
      }

      content.style.display = 'inline-block'
      cb()
      content.style.display = 'none'
    })
  }

  /** TODO решить проблему с width равным 0 при первой отрисовке */
  const updateDimensions = (): Promise<void> => {
    return new Promise((resolve) => {
      snapShot(() => {
        activator && setActivatorDimensions()
        content && setContentDimensions()
        resolve()
      })
    })
  }

  const setActivatorDimensions = () => {
    dimensions.activator = getRect(activator)

    dimensions.activator.height = activator.offsetHeight
    dimensions.activator.top += getScrollTop()
    dimensions.activator.left += getScrollLeft()
  }

  const setContentDimensions = () => {
    const contentWidth = +props.width || content?.offsetWidth

    dimensions.content.height = content.offsetHeight
    dimensions.content.top = calcPositionY()
    dimensions.content.left = calcPositionX()
    dimensions.content.width = contentWidth || activator?.offsetWidth
  }

  const setDimensions = (activatorEl: HTMLElement) => {
    if (!activator && !content) {
      activator = activatorEl
      content = contentRef.value!
    }

    return updateDimensions()
  }

  return {
    dimensions,
    contentRef,
    setDimensions,
    updateDimensions,
  }
}
