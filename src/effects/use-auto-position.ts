import { ref, reactive } from 'vue'
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

  const contentRef = ref<HTMLElement | any | null>(null)
  const offset: number = +props.offsetY || 10

  let activator: HTMLElement
  let content: HTMLElement
  let activatorRect: Dimensions
  let diff: number
  let minDiff: number

  function getBoundedClientRect(el) {
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

  function getInnerHeight(): number {
    if (!window) return 0

    return innerHeight || document.documentElement.clientHeight
  }

  function getOffsetTop(): number {
    if (!window) return 0

    return pageYOffset || document.documentElement.scrollTop
  }

  function calcDiffs() {
    const scrollHeight = getOffsetTop() + getInnerHeight()
    const contentFull = dimensions.content.height + dimensions.activator.top

    diff = scrollHeight - contentFull
    minDiff = (dimensions.content.height / 100) * 10
  }

  function calcTopPosition() {
    calcDiffs()

    if (props.bottom) {
      if (diff <= minDiff)
        return dimensions.activator.top - dimensions.content.height

      return dimensions.activator.top + dimensions.activator.height
    }

    if (diff <= minDiff) return dimensions.activator.top + diff

    return dimensions.activator.top
  }

  function snapShot(cb) {
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
        dimensions.activator.height = activator?.offsetHeight
        dimensions.content.height = content.offsetHeight

        activatorRect = getBoundedClientRect(activator)

        setActivatorDimensions()
        setContentDimensions()
        resolve()
      })
    })
  }

  function setActivatorDimensions() {
    dimensions.activator.width = activatorRect.width
    dimensions.activator.top = activatorRect.top + pageYOffset
    dimensions.activator.left = activatorRect.left
  }

  function setContentDimensions() {
    dimensions.content.top =
      calcTopPosition() - ((!props.bottom && offset) || 0)

    dimensions.content.left = dimensions.activator.left
    dimensions.content.width = dimensions.activator.width
  }

  function setDimensions(activatorEl) {
    if (!activator) {
      activator = activatorEl
      content = contentRef.value
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
