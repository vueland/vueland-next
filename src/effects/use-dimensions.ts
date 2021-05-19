import { ref, reactive } from 'vue'

export function useDimensions(props) {
  const dimensions = reactive({
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
  const offset = 10
  let activator
  let activatorRect
  let content
  let diff
  let minDiff = 20

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

  function calcBottom() {
    calcDiffs()

    if (props.bottom) {
      if (diff <= minDiff)
        return dimensions.activator.top - dimensions.content.height

      return dimensions.activator.top + dimensions.activator.height
    }

    if (diff <= minDiff) return dimensions.activator.top + diff

    return dimensions.activator.top
  }

  function calcDiffs() {
    const scrollHeight = getOffsetTop() + getInnerHeight()
    const contentFull = dimensions.content.height + dimensions.activator.top

    diff = scrollHeight - contentFull
    minDiff = dimensions.content.height / 100 * 10
  }

  function snapShot(cb) {
    requestAnimationFrame(() => {
      if (!content || content.style.display !== 'none') {
        cb()

        return
      }

      content.style.display = 'inline-block'
      cb()
      content.style.display = 'none'
    })
  }

  function setDimensions(activatorEl) {
    if (!activator) {
      activator = activatorEl
      content = contentRef.value
    }

    // activatorRect = getBoundedClientRect(activator)
    //
    // setActivatorDimensions()
    // setContentDimensions()

    updateDimensions()
  }

  function updateDimensions() {
    snapShot(() => {
      dimensions.activator.height = activator.offsetHeight
      dimensions.content.height = content.offsetHeight

      activatorRect = getBoundedClientRect(activator)

      setActivatorDimensions()
      setContentDimensions()
    })
  }

  function setActivatorDimensions() {
    dimensions.activator.width = activatorRect.width
    dimensions.activator.top = activatorRect.top + pageYOffset
    dimensions.activator.left = activatorRect.left
  }

  function setContentDimensions() {
    dimensions.content.top = calcBottom() - offset
    dimensions.content.left = dimensions.activator.left
    dimensions.content.width = dimensions.activator.width
  }

  return {
    dimensions,
    contentRef,
    setDimensions,
  }
}
