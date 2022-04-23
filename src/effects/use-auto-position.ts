import { ref, reactive, computed } from 'vue'
import { Dimensions } from '../../types'

type MainDimensions = {
  activator: Dimensions
  content: Dimensions
  pageYOffset: number
  pageWidth: number
}

export function autoPositionProps() {
  return {
    positionX: {
      type: Number,
      default: 0,
    },
    positionY: {
      type: Number,
      default: 0,
    },
  }
}

export function useAutoPosition(props) {
  const dimensions = reactive<MainDimensions>({
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
    pageYOffset: 0,
    pageWidth: 0,
  })

  const contentRef = ref<HTMLElement | null>(null)
  const offsetY: number = +props.offsetY
  // const offsetX: number = +props.offsetX

  let activator: HTMLElement
  let content: HTMLElement
  let contentBottomPoint: number = 0

  function getRect(el: HTMLElement) {
    const rect = el.getBoundingClientRect()

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    }
  }

  const isAbsolutePositioned = computed<boolean>(() => {
    return !!props.positionY || !!props.positionX
  })

  function getInnerHeight(): number {
    if (!window) return 0

    return innerHeight || document.documentElement.clientHeight
  }

  function getScrollTop(): number {
    if (!window) return 0

    return pageYOffset || document.documentElement.scrollTop
  }

  function getScrollLeft(): number {
    if (!window) return 0

    return pageXOffset || document.documentElement.scrollLeft
  }

  function getContentAbsoluteBottomPoint() {
    return dimensions.content.height + props.positionY + getScrollTop()
  }

  function getContentBottomPoint() {
    const { activator, content } = dimensions

    if (props.bottom) {
      return content.height + activator.top + activator.height
    }

    return content.height + activator.top
  }

  function calcContentBottomPosition() {
    const fullHeight = getScrollTop() + getInnerHeight()

    const contentBottomPosition = isAbsolutePositioned.value
      ? getContentAbsoluteBottomPoint()
      : getContentBottomPoint()

    return fullHeight - contentBottomPosition
  }

  function calcLeftPosition(): number {
    if (props.positionX) return props.positionX + getScrollLeft()

    return dimensions.activator.left
  }

  function calcAbsoluteTop() {
    const topPosition = props.positionY + getScrollTop()

    if (offsetY >= contentBottomPoint) {
      return topPosition + contentBottomPoint - offsetY
    }

    return topPosition
  }

  function calcBottomPosition() {
    const { activator, content } = dimensions

    if (offsetY >= contentBottomPoint) {
      return activator.top - content.height - offsetY
    }

    return activator.top + activator.height + offsetY
  }

  function calcAutoBottomPosition() {
    if (offsetY >= contentBottomPoint) {
      return dimensions.activator.top + contentBottomPoint - offsetY
    }

    return dimensions.activator.top
  }

  function calcPositionY(): number {
    contentBottomPoint = calcContentBottomPosition()

    if (props.positionY) return calcAbsoluteTop()

    if (props.bottom) return calcBottomPosition()

    return calcAutoBottomPosition()
  }

  function snapShot(cb: () => any) {
    requestAnimationFrame(() => {
      if (!content || content.style.display !== 'none') return cb()
      content.style.display = 'inline-block'
      cb()
      content.style.display = 'none'
    })
  }

  function updateDimensions(): Promise<void> {
    return new Promise((resolve) => {
      snapShot(() => {
        activator && setActivatorDimensions()
        content && setContentDimensions()
        resolve()
      })
    })
  }

  function setActivatorDimensions() {
    dimensions.activator = getRect(activator)

    dimensions.activator.height = activator.offsetHeight
    dimensions.activator.top = dimensions.activator.top + getScrollTop()
    dimensions.activator.left = dimensions.activator.left + getScrollLeft()
  }

  function setContentDimensions() {
    const rect = activator ? dimensions.activator : getRect(content)

    dimensions.content.height = content.offsetHeight
    dimensions.content.top = calcPositionY()
    dimensions.content.left = calcLeftPosition()
    dimensions.content.width = rect.width
  }

  function setDimensions(activatorEl: HTMLElement) {
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
