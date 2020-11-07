// Styles
import './VResize.scss'
// Vue API
import {
  onMounted,
  h,
  ref,
  watch,
  computed,
  reactive,
  defineComponent
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
  offsetTop: number
  offsetLeft: number
  parentHeight: number
  parentWidth: number
  marginLeft: number
  marginTop: number
  left: number
  top: number
  resized: boolean
  isActive: boolean
}

export const VResize = defineComponent({
  name: 'v-resize',
  props: vResizeProps,

  setup(props, { emit }) {

    const data: ResizeData = reactive({
      parentNode: null,
      offsetTop: 0,
      offsetLeft: 0,
      parentHeight: 0,
      parentWidth: 0,
      marginLeft: 0,
      marginTop: 0,
      left: 0,
      top: 0,
      resized: false,
      isActive: false
    })

    const resRef = ref<HTMLElement | null>(null)

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-resize': true,
        'v-resize--active': data.isActive,
        'v-resize--top': props.top,
        'v-resize--bottom': props.bottom,
        'v-resize--right': props.right,
        'v-resize--left': props.left,
        [props.customClass]: !!props.customClass,
      }
    })

    const isDirectY = computed<boolean>(() => {
      return props.top || props.bottom
    })

    const isNeedReverse = computed<boolean>(() => {
      return props.top || props.left
    })

    const currentSize = computed<number>(() => {
      return isDirectY.value ? data.parentHeight! : data.parentWidth!
    })

    const sizeProp = computed<string>(() => {
      return isDirectY.value ? 'height' : 'width'
    })

    const reverseDirection = computed<string>(() => {
      return props.top ? 'top' : 'left'
    })

    const reverseOffsetKey = computed<string>(() => {
      const side = reverseDirection.value
      return 'offset' + side[0].toUpperCase() + side.slice(1)
    })

    const offset = computed<number>(() => {
      return isDirectY.value ? data.offsetTop! : data.offsetLeft!
    })

    const direction = computed<string>(() => {
      return isDirectY.value ? 'clientY' : 'clientX'
    })

    watch(() => data.isActive, to => {
      to && computeSizes()
      to && setStartPositions()
    })

    function moveReverse(size) {
      const { parentNode, left, top } = data
      const reverseTo = reverseDirection.value

      const value = !isDirectY.value ?
        (currentSize.value - size + left) :
        (currentSize.value - size + top)

      parentNode!.style[reverseTo] = `${ value }px`
    }

    function setOrEmitSize(size) {
      if (props.emit) return emit('size', size)
      data.parentNode!.style[sizeProp.value] = `${ size }px`

      isNeedReverse.value && moveReverse(size)
    }

    function resize(e) {
      let size

      if (isNeedReverse.value) {
        size = currentSize.value! - (e[direction.value] - offset.value!)
      } else {
        size = currentSize.value! + (e[direction.value] - currentSize.value! - offset.value)
      }

      size > props.minSize && setOrEmitSize(size)
    }

    function resetMinMaxStyles() {
      if (isDirectY.value) {
        data.parentNode!.style.maxHeight = ''
        data.parentNode!.style.minHeight = ''
      } else {
        data.parentNode!.style.maxWidth = ''
        data.parentNode!.style.minWidth = ''
      }
    }

    function setParent() {
      const parent = resRef.value!.parentNode
      data.parentNode = parent as HTMLElement
    }

    function computeSizes() {
      const {
        top,
        left,
        height,
        width,
        marginLeft,
        marginTop
      } = getComputedStyle(data.parentNode!)

      data.offsetTop = data.parentNode!.offsetTop
      data.offsetLeft = data.parentNode!.offsetLeft
      data.marginLeft = parseFloat(marginLeft)
      data.marginTop = parseFloat(marginTop)
      data.parentHeight = parseFloat(height)
      data.parentWidth = parseFloat(width)
      data.top = parseFloat(top)
      data.left = parseFloat(left)
    }

    function setStartPositions() {
      const side = reverseDirection.value
      const offset = reverseOffsetKey.value

      if (data[side] === data[offset]) {
        data.parentNode!.style[side] = `${ data[offset] }px`
      }
    }

    function disableSelection(e) {
      e.preventDefault()
    }

    function initResize(e) {
      if (!data.resized) {
        data.isActive = true
        data.resized = true
        resetMinMaxStyles()
      }
      requestAnimationFrame(() => {
        resize(e)
      })
    }

    function reset() {
      data.resized = false
      data.isActive = false
      resetMinMaxStyles()
    }

    function onMouseup() {
      reset()
      removeHandlers()
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
      setParent()
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
