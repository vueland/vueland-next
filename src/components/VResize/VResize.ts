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
  offsetTop: number
  offsetLeft: number
  parentHeight: number
  parentWidth: number
  marginLeft: number
  marginTop: number
  resized: boolean
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
      resized: false,
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

    const isDirectY = computed<boolean>(() => {
      return props.top || props.bottom
    })

    const isNeedReverse = computed<boolean>(() => {
      return props.top || props.left
    })

    const currentSize = computed<number>(() => {
      return isDirectY.value ? data.parentHeight! : data.parentWidth!
    })

    const styleProp = computed<string>(() => {
      return isDirectY.value ? 'height' : 'width'
    })

    const reverseFrom = computed<string>(() => {
      return props.top ? 'top' : 'left'
    })

    const offset = computed<number>(() => {
      return isDirectY.value ? data.offsetTop! : data.offsetLeft!
    })

    const direction = computed<string>(() => {
      return isDirectY.value ? 'clientY' : 'clientX'
    })

    function moveReverse(size) {
      const {
        parentNode,
        offsetTop,
        offsetLeft,
        marginLeft,
        marginTop
      } = data

      const offset = props.top ?
        offsetTop! - marginTop :
        offsetLeft! - marginLeft

      parentNode!.style[reverseFrom.value] = `${ currentSize.value - size + offset }px`
    }

    function setOrEmitSize(size) {

      if (!props.emit) {
        data.parentNode!.style[styleProp.value] = size + 'px'
      } else {
        emit('size', size)
      }

      isNeedReverse.value && moveReverse(size)
    }

    function resize(e) {
      const startPoint = e[direction.value]

      let size

      if (isNeedReverse.value) {
        size = currentSize.value! - (startPoint - offset.value!)
      } else {
        size = currentSize.value! + (startPoint - currentSize.value! - offset.value!)
      }

      size > props.minSize ? setOrEmitSize(size) : false
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

    function computeParentNode() {
      const parent = resRef.value!.parentNode
      const {
        left,
        top,
        height,
        width,
        marginLeft,
        marginTop
      } = getComputedStyle(parent as HTMLElement)

      data.parentNode = parent as HTMLElement
      data.offsetTop = parseFloat(top)
      data.offsetLeft = parseFloat(left)
      data.marginLeft = parseFloat(marginLeft)
      data.marginTop = parseFloat(marginTop)
      data.parentHeight = parseFloat(height)
      data.parentWidth = parseFloat(width)
      data.offsetTop += data.marginTop
      data.offsetLeft += data.marginLeft
    }

    function disableSelection (e) {
      e.preventDefault()
    }

    function initResize(e) {
      if (!data.resized) {
        data.resized = true
        computeParentNode()
        resetMinMaxStyles()
      }
      resize(e)
    }

    function reset() {
      data.resized = false
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
