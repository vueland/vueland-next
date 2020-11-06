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
  direction: string,
  currentSize: number,
  resized: boolean,
  directX: boolean,
  directY: boolean
  styleParam: string
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
      currentSize: 0,
      resized: false,
      directX: false,
      directY: false,
      direction: '',
      styleParam: ''
    })

    const resRef = ref<HTMLElement | null>(null)

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

    function setDirect() {
      data.directY = props.top || props.bottom
      data.directX = props.left || props.right
    }

    function reversedTranslate(size) {
      if (props.top || props.left) {
        const offset = props.top ? data.offsetTop! : data.offsetLeft!
        const styleParam = props.top ? 'top' : 'left'
        data.parentNode!.style[styleParam] = `${ data.currentSize! - size + offset }px`
      }
    }

    function setOrEmitSize(size) {
      if (!props.emit) {
        data.parentNode!.style[data.styleParam] = size + 'px'
        reversedTranslate(size)
      } else {
        emit('size', size)
      }
    }

    function resize(e) {
      const offset = data.directY ? data.offsetTop : data.offsetLeft
      const startPoint = e[data.direction]

      data.currentSize = data.directY ? data.parentHeight! : data.parentWidth!

      let size

      if (props.top || props.left) {
        size = data.currentSize! - (startPoint - offset!)
      } else {
        size = data.currentSize! + (startPoint - data.currentSize! - offset!)
      }

      size > props.minSize ? setOrEmitSize(size) : false
    }

    function resetMinMaxStyles() {
      if (data.directX) {
        data.parentNode!.style.maxWidth = ''
        data.parentNode!.style.minWidth = ''
      } else {
        data.parentNode!.style.maxHeight = ''
        data.parentNode!.style.minHeight = ''
      }
    }

    function computeParentNode() {
      const parent = resRef.value!.parentNode
      const {
        left,
        top,
        height,
        width
      } = getComputedStyle(parent as HTMLElement)

      data.parentNode = parent as HTMLElement
      data.offsetTop = parseFloat(top)
      data.offsetLeft = parseFloat(left)
      data.parentHeight = parseFloat(height)
      data.parentWidth = parseFloat(width)
    }

    function detectDirection() {
      data.direction = data.directY ? 'clientY' : 'clientX'
      data.styleParam! = data.directY ? 'height' : 'width'
    }

    const disableSelection = (e) => {
      e.preventDefault()
    }

    function initResize(e) {
      if (!data.resized) {
        data.resized = true
        detectDirection()
        computeParentNode()
        resetMinMaxStyles()
      }
      resize(e)
    }

    function reset() {
      data.resized = false
      data.offsetTop = null
      resetMinMaxStyles()
    }

    function onMouseup() {
      reset()
      removeHandlers()
      detectDirection()
    }

    function onMousedown() {
      document.addEventListener('mousemove', initResize)
      document.addEventListener('mouseup', onMouseup)
      document.addEventListener('selectstart', disableSelection)
    }

    function removeHandlers() {
      document.removeEventListener('mousemove', initResize)
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
