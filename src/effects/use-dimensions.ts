import { ref, onMounted, reactive } from 'vue'

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

  const activatorRef = ref<HTMLElement | any | null>(null)
  const contentRef = ref<HTMLElement | any | null>(null)

  function setDimensions() {
    const bcr = activatorRef.value?.$el.getBoundingClientRect()

    setActivatorDimensions(bcr)
    setContentDimensions(bcr)
  }

  function setActivatorDimensions(bcr) {
    dimensions.activator.width = bcr.width
    dimensions.activator.top = bcr.top + pageYOffset
    dimensions.activator.left = bcr.left
  }

  function setContentDimensions(bcr) {
    const content = contentRef.value.$el
    // console.log(content.style.height)
    dimensions.content.top = bcr.top + pageYOffset
    dimensions.content.left = bcr.left
    dimensions.content.width = bcr.width
  }

  function calculatePositionLeft() {}

  function calculatePositionTop() {
    setDimensions()
  }

  onMounted(() => {
    setDimensions()
  })

  return {
    dimensions,
    activatorRef,
    contentRef,
    calculatePositionLeft,
    calculatePositionTop,
  }
}
