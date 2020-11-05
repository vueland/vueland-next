// Styles
import './VResize.scss'

// Vue API
import {
  defineComponent,
  h,
  reactive,
  ref,
  computed,
  onMounted,
} from 'vue'

// Effects
import { positionProps } from '../../effects/use-position'

// Types
import { Props } from '../../types'

const vResizeProps: Props = {
  emit: {
    type: Boolean,
    default: false,
  },

  customClass: {
    type: String,
  },

  minSize: {
    type: [String, Number],
    default: 50,
  },
  ...positionProps(),
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
      directY: false,
    })

    const resRef = ref<HTMLElement | null>(null)

    const setDirect = () => {
      data.directY = props.top || props.bottom
      data.directX = props.left || props.right
    }

    const reversedTranslate = (size) => {

      if (props.top) {
        data.parentNode!.style.top = `${data.offsetTop! - size}px`
      }
      if (props.left) {
        data.parentNode!.style.left = `${data.parentWidth! - size}px`
      }
    }

    const setOrEmitSize = (size) => {
      if (!props.emit) {
        const prop = data.directY ? 'height' : 'width'
        data.parentNode!.style[prop] = size + 'px'
        reversedTranslate(size)
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

      change > props.minSize ? setOrEmitSize(change) : removeHandlers()
    }

    const resetMaxStyles = () => {
      const { maxWidth, maxHeight } = getComputedStyle(data.parentNode!)

      if (maxWidth) data.parentNode!.style.maxWidth = data.parentNode!.style.width + 'px'
      if (maxHeight) data.parentNode!.style.maxHeight = data.parentNode!.style.height + 'px'
    }

    const computeParentNode = () => {

      const parent = resRef.value!.parentNode
      const { left, top, height, width } = getComputedStyle(parent as HTMLElement)

      data.parentNode = parent as HTMLElement
      data.offsetTop = parseFloat(top)
      data.offsetLeft = parseFloat(left)
      data.parentHeight = parseFloat(height)
      data.parentWidth = parseFloat(width)
    }

    const detectDirection = (e) => {
      computeParentNode()
      data.direction = data.directY ? 'clientY' : 'clientX'
      data.directOffset = e[data.direction] - (props.directY ? data.offsetTop : data.offsetLeft)!
    }

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-resize': true,
        'v-resize--top': props.top,
        'v-resize--bottom': props.bottom,
        'v-resize--right': props.right,
        'v-resize--left': props.left,
        [props.customClass]: !!props.customClass,
      }
    })


    const disableSelection = (e) => {
      e.preventDefault()
    }

    const resizeAction = (e) => {
      if (!data.resized) {
        data.resized = true
        detectDirection(e)
        computeParentNode()
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
      reset()
      removeHandlers()
      detectDirection(e)
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

    onMounted(() => {
      setDirect()
      computeParentNode()
    })

    return () => h('div', {
      class: {
        ...classes.value,
      },
      key: 'resize',
      ref: resRef,
      onMousedown,
    })
  },
})
