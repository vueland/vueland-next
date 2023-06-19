import { computed, ref, reactive, unref } from 'vue'
import { Dimensions } from '../../types'

type MainDimensions = {
  activator: Dimensions
  content: Dimensions
  pageYOffset: number
  pageWidth: number
}

export function autoPositionProps(){
  return {
    positionX: {
      type: Number,
      default: 0
    },
    positionY: {
      type: Number,
      default: 0
    }
  }
}

export function useAutoPosition(props){
  const app = document.querySelector('.v-app')!

  const dimensions = reactive<MainDimensions>({
    activator: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    },
    content: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    },
    pageYOffset: 0,
    pageWidth: 0
  })

  const contentRef = ref<Maybe<HTMLElement>>(null)
  const offsetY: number = +props.offsetY
  // const offsetX: number = +props.offsetX || 20

  let activator: HTMLElement
  let content: HTMLElement
  let contentBottomBorder: number = 0

  const getRect = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect()

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height
    }
  }

  const isAbsolutePositioned = computed<boolean>(() => {
    return !!props.positionY || !!props.positionX
  })

  const getInnerHeight = (): number => {
    if (!window) return 0

    return innerHeight || document.documentElement.clientHeight
  }

  const getScrollTop = (): number => {
    if (!window) return app.scrollTop

    return pageYOffset || app.scrollTop
  }

  const getScrollLeft = (): number => {
    if (!window) return app.scrollLeft

    return pageXOffset || app.scrollLeft
  }

  const getContentAbsoluteBottomPoint = () => {
    return dimensions.content.height + props.positionY + getScrollTop()
  }

  const getContentBottomBorder = () => {
    const { activator, content } = dimensions

    if (props.bottom) {
      return content.height + activator.top + activator.height
    }

    if (props.top) {
      return activator.top
    }

    return content.height + activator.top
  }

  const calcContentBottomPosition = () => {
    const fullHeight = getScrollTop() + getInnerHeight()

    const contentBottomPosition = unref(isAbsolutePositioned)
      ? getContentAbsoluteBottomPoint()
      : getContentBottomBorder()

    return fullHeight - contentBottomPosition
  }

  const calcAbsoluteTop = () => {
    const topPosition = props.positionY + getScrollTop()

    if (offsetY >= contentBottomBorder) {
      return topPosition + contentBottomBorder - offsetY
    }

    return topPosition
  }

  const calcBottomPosition = () => {
    const { activator, content } = dimensions

    if (offsetY >= contentBottomBorder) {
      return activator.top - content.height - offsetY
    }

    return activator.top + activator.height + offsetY
  }

  const calcTopPosition = () => {
    const { activator, content } = dimensions

    if (content.height + getScrollTop() + offsetY > activator.top) {
      return activator.top + activator.height
    }

    return activator.top - content.height
  }

  const calcContentAutoPosition = () => {
    if (offsetY >= contentBottomBorder) {
      return dimensions.activator.top + contentBottomBorder - offsetY
    }

    return dimensions.activator.top
  }

  const calcPositionY = (): number => {
    contentBottomBorder = calcContentBottomPosition()

    if (props.positionY) return calcAbsoluteTop()
    if (props.bottom) return calcBottomPosition()
    if (props.top) return calcTopPosition()

    return calcContentAutoPosition()
  }

  const calcPositionX = (): number => {
    if (props.positionX) return props.positionX + getScrollLeft()

    return dimensions.activator.left
  }

  const snapShot = (cb: () => any) => {
    requestAnimationFrame(() => {
      if (!content || content.style.display !== 'none') return cb()
      content.style.display = 'inline-block'
      cb()
      content.style.display = 'none'
    })
  }

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
    dimensions.activator.top = dimensions.activator.top + getScrollTop()
    dimensions.activator.left = dimensions.activator.left + getScrollLeft()
  }

  const setContentDimensions = () => {
    const rect = activator
      ? dimensions.activator
      : getRect(content)

    dimensions.content.height = content.offsetHeight
    dimensions.content.top = calcPositionY()
    dimensions.content.left = calcPositionX()
    dimensions.content.width = rect.width
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
    updateDimensions
  }
}
