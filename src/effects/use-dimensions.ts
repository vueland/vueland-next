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
      offsetTop: 0,
      scrollHeight: 0,
      offsetLeft: 0,
    },
  })

  const contentRef = ref<HTMLElement | any | null>(null)
  let activator
  let activatorRects

  function setDimensions(activatorRef) {
    activator = activatorRef.value!
    activatorRects = activator.getBoundingClientRect()

    setActivatorDimensions()
    setContentDimensions()
  }

  function setActivatorDimensions() {
    dimensions.activator.width = activatorRects.width
    dimensions.activator.top = activatorRects.top + pageYOffset
    dimensions.activator.left = activatorRects.left
  }

  function setContentDimensions() {
    activator.style.display = ''
    requestAnimationFrame(() => {
      console.log(
        'content offsetTop: ' + contentRef.value!.offsetTop + '\n',
        'pageYOffset: ' + pageYOffset + '\n',
        'activator offsetTop: ' + getComputedStyle(activator).top + '\n'
      )
    })

    dimensions.content.top = activatorRects.top + pageYOffset - 10
    dimensions.content.left = activatorRects.left
    dimensions.content.width = activatorRects.width
  }

  function calculatePositionLeft() {
    console.log('calc')
  }

  return {
    dimensions,
    contentRef,
    setDimensions,
    calculatePositionLeft,
  }
}
