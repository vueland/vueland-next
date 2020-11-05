// Styles
import './VResize.scss'

// Vue API
import { defineComponent, h, reactive, ref, computed } from 'vue'

// Effects
import { positionProps } from '../../effects/use-position'

// Types
import { Props } from '../../types'

const vResizeProps: Props = {
  emit: {
    type: Boolean,
    default: false
  },

  customClass: {
    type: String,
  },

  minSize: {
    type: [String, Number],
    default: 50
  },
  ...positionProps()
}

type ResizeData = {
  parentNode: HTMLElement | null
  offsetTop: number | null
  offsetLeft: number | null,
  parentHeight: number | null,
  parentWidth: number | null,
  offset: number,
  direction: string,
  directOffset: number,
  resized: boolean,
  directX: boolean,
  directY: boolean
}

export const VResize = defineComponent({
  name: 'v-resize',
  props: vResizeProps,

  setup(props, { emit }) {

    const data: ResizeData = reactive({
      parentNode: null,
      offsetTop: null,
      offsetLeft: null,
      parentHeight: null,
      parentWidth: null,
      offset: 0,
      direction: '',
      directOffset: 0,
      resized: false,
      directX: false,
      directY: false
    })

    const resRef = ref<HTMLElement | null>(null)

    const setDirect = () => {
      data.directY = props.top || props.bottom
      data.directX = props.left || props.right
    }

    const setOrEmitSize = (size) => {
      if (!props.emit) {
        const prop = data.directY ? 'height' : 'width'
        data.parentNode!.style[prop] = size + 'px'

        if (props.top) {
          data.parentNode!.style.top = `translateY(${ data.parentHeight! - size }px)`
        }
        if (props.left) {
          data.parentNode!.style.transform = `translateX(${ data.parentWidth! - size }px)`
        }


      } else {
        emit('size', size)
      }
    }

    const resize = (e) => {
      let change

      const offset = data.directY ? data.offsetTop : data.offsetLeft
      const willChangeSize = data.directY ? data.parentHeight : data.parentWidth
      const startPoint = (offset! - e[data.direction] + data.directOffset)

      if (props.top || props.left) change = willChangeSize! + startPoint
      else change = willChangeSize! - startPoint
      console.log(data.directY, data.offsetTop, data.offsetLeft)

      change > props.minSize ? setOrEmitSize(change) : removeHandlers()
    }

    const resetMaxStyles = () => {
      const { maxWidth, maxHeight } = getComputedStyle(data.parentNode!)

      if (maxWidth) data.parentNode!.style.maxWidth = data.parentNode!.style.width + 'px'
      if (maxHeight) data.parentNode!.style.maxHeight = data.parentNode!.style.height + 'px'
    }

    const detectDirection = (e) => {
      const parent = resRef.value!.parentNode

      data.parentNode = parent as HTMLElement
      data.offsetTop = (parent as HTMLElement).offsetTop
      data.offsetLeft = (parent as HTMLElement).offsetLeft
      data.direction = data.directY ? 'clientY' : 'clientX'

      data.directOffset = e[data.direction] - (props.directY ? data.offsetTop : data.offsetLeft)!
    }

    const setParentNodeSizes = () => {
      data.parentHeight = data.parentNode!.offsetHeight
      data.parentWidth = data.parentNode!.offsetWidth
      console.log(data.parentHeight)
    }

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-resize': true,
        'v-resize--top': props.top,
        'v-resize--bottom': props.bottom,
        'v-resize--right': props.right,
        'v-resize--left': props.left,
        [props.customClass]: !!props.customClass
      }
    })


    const disableSelection = (e) => {
      e.preventDefault()
    }

    const resizeAction = (e) => {
      if (!data.resized) {
        data.resized = true
        detectDirection(e)
        setParentNodeSizes()
        resetMaxStyles()
      }
      resize(e)
    }

    const reset = () => {
      data.resized = false
      data.offsetTop = null
      resetMaxStyles()
    }

    const onMouseup = (e) => {
      console.log(data.offsetTop)
      reset()
      removeHandlers()
      detectDirection(e)
      setParentNodeSizes()
    }

    function onMousedown() {
      document.addEventListener('mousemove', resizeAction)
      document.addEventListener('mouseup', onMouseup)
      document.addEventListener('selectstart', disableSelection)
    }

    function removeHandlers() {
      document.removeEventListener('mousemove', resizeAction)
      document.removeEventListener('mouseup', onMouseup)
      document.removeEventListener('selectstart', disableSelection)
    }

    setDirect()

    return () => h('div', {
      class: {
        ...classes.value
      },
      key: 'resize',
      ref: resRef,
      onMousedown,
      // onMouseleave
    })
  }
})
