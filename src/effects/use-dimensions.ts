import { ref, onMounted, reactive } from 'vue'
import { useActivator } from './use-activator'

export function useDimensions() {
  const { activatorRef } = useActivator()

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
      offsetLeft: 0
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
      offsetLeft: 0
    }
  })

  const contentRef = ref<HTMLElement | any | null>(null)

  function setDimensions() {
    const el = activatorRef.value!
    const bcr = el.getBoundingClientRect()
    setActivatorDimensions(bcr)
    setContentDimensions(bcr)
  }

  function setActivatorDimensions(bcr) {
    dimensions.activator.width = bcr.width
    dimensions.activator.top = bcr.top + pageYOffset
    dimensions.activator.left = bcr.left
  }

  function setContentDimensions(bcr) {
    dimensions.content.top = bcr.top + pageYOffset
    dimensions.content.left = bcr.left
    dimensions.content.width = bcr.width
    // dimensions.content.height = contentRef.value.getBoundingClientRect()
  }

  function calculatePositionLeft() {
    console.log('calc')
  }

  function calculatePositionTop() {
    setDimensions()
  }

  onMounted(() => {
    if (activatorRef.value) {
      setDimensions()
      console.log(dimensions)
      console.log(contentRef.value.getBoundingClientRect())
    }

  })

  return {
    dimensions,
    contentRef,
    activatorRef,
    calculatePositionLeft,
    calculatePositionTop
  }
}
