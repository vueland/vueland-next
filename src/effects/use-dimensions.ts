import { ref, reactive } from 'vue'

export function useDimensions() {
  const dimensions = reactive({
    activator: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      offsetTop: 0,
      scrollHeight: 0,
      offsetLeft: 0,
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

  const contentRef = ref<HTMLElement | any | null>(null)
  let activator
  let activatorRects

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

  function snapShot(cb) {
    requestAnimationFrame(() => {
      const el = contentRef.value

      if (!el || el.style.display !== 'none') {
        cb()
        return
      }

      el.style.display = 'inline-block'
      cb()
      el.style.display = 'none'
    })
  }

  function setDimensions(activatorRef) {
    activator = activatorRef.value!
    activatorRects = getBoundedClientRect(activator)

    setActivatorDimensions()
    setContentDimensions()
  }

  function setActivatorDimensions() {
    dimensions.activator.width = activatorRects.width
    dimensions.activator.top = activatorRects.top + pageYOffset
    dimensions.activator.left = activatorRects.left

    dimensions.activator.offsetLeft = activator.offsetLeft
    dimensions.activator.offsetTop = activator.offsetTop
  }

  function setContentDimensions() {
    dimensions.content.top = activatorRects.top + pageYOffset
    dimensions.content.left = activatorRects.left
    dimensions.content.width = activatorRects.width
  }

  return {
    dimensions,
    contentRef,
    setDimensions,
  }
}
