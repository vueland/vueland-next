// Vue API
import {
  h,
  ref,
  computed,
  reactive,
  defineComponent,
  onMounted,
  onBeforeUnmount,
} from 'vue'

// Effects
import { positionProps } from '../../composable/use-position'
import { useColors } from '../../composable/use-colors'

// Types
import { VNode } from 'vue'

type ResizeData = {
  parentNode: HTMLElement | null
  startOffset: number | null
  offsetTop: number
  offsetLeft: number
  parentHeight: number
  parentWidth: number
  marginLeft: number
  marginTop: number
  left: number
  top: number
  isActive: boolean
}

export const VResize = defineComponent({
  name: 'v-resize',

  props: {
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
    color: {
      type: String,
      default: 'grey lighten-2',
    },
    ...positionProps(),
  } as any,

  emits: ['resize'],

  setup(props, { emit }): () => VNode {
    const data: ResizeData = reactive({
      parentNode: null,
      startOffset: null,
      offsetTop: 0,
      offsetLeft: 0,
      parentHeight: 0,
      parentWidth: 0,
      marginLeft: 0,
      marginTop: 0,
      left: 0,
      top: 0,
      isActive: false,
    })

    const resizeRef = ref<HTMLElement | null>(null)

    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-resize': true,
        'v-resize--active': data.isActive,
        'v-resize--top': props.top,
        'v-resize--bottom': props.bottom,
        'v-resize--right': props.right,
        'v-resize--left': props.left,
        [props.customClass]: !!props.customClass,
        ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
      }
    })

    const styles = computed(() => ({
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

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

    function moveReverse(size) {
      const { parentNode, left, top } = data
      const reverseTo = reverseDirection.value

      const value = !isDirectY.value
        ? currentSize.value - size + left
        : currentSize.value - size + top

      parentNode!.style[reverseTo] = `${value}px`
    }

    function setOrEmitSize(size) {
      if (props.emit) return emit('resize', size)

      data.parentNode!.style[sizeProp.value] = `${size}px`

      isNeedReverse.value && moveReverse(size)
    }

    function resize(e) {
      let size

      if (isNeedReverse.value) {
        size =
          currentSize.value -
          (e[direction.value] - offset.value) +
          data.startOffset!
      } else {
        size =
          currentSize.value +
          (e[direction.value] -
            currentSize.value -
            offset.value -
            data.startOffset!)
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
      const parent = resizeRef.value!.parentNode
      data.parentNode = parent as HTMLElement
    }

    function computeSizes() {
      const { top, left, height, width, marginLeft, marginTop } =
        getComputedStyle(data.parentNode!)

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
        data.parentNode!.style[side] = `${data[offset]}px`
      }
    }

    function disableSelection(e) {
      e.preventDefault()
    }

    function initResize(e) {
      if (!data.isActive) {
        data.isActive = true
        computeSizes()
        resetMinMaxStyles()
        setStartPositions()
        setStartOffset(e)
      }

      requestAnimationFrame(() => resize(e))
    }

    function setStartOffset(e) {
      if (isNeedReverse.value) data.startOffset = e[direction.value]
      else data.startOffset = e[direction.value] - currentSize.value

      data.startOffset! -= offset.value
    }

    function reset() {
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

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', onMousedown)
    })

    return () => {
      const propsData = {
        class: classes.value,
        style: styles.value,
        key: 'resize',
        ref: resizeRef,
        onMousedown,
      }
      return h('div', propsData)
    }
  },
})
