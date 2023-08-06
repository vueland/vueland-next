// Vue API
import {
  h,
  // shallowRef,
  reactive,
  watch,
  withDirectives,
  defineComponent,
  computed,
  onMounted,
  vShow,
  unref, onBeforeUnmount,
} from 'vue'

// Effects
import { useToggle } from '../../composables/use-toggle'
import { useColors } from '../../composables/use-colors'
import { useActivator } from '../../composables/use-activator'
import { useAutoPosition, autoPositionProps } from '../../composables/use-auto-position'
import { useTransition } from '../../composables/use-transition'
import { useDetach } from '../../composables/use-detach'
import { elevationProps, useElevation } from '../../composables/use-elevation'
import { positionProps } from '../../composables/use-position'

// Types
import { OffsetSizes } from '../../../types'
import { VNode } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

// Services
import { transitions } from '../../services/transitions'

// TODO fix behavior on window resize if v-model used on component

export default defineComponent({
  name: 'v-tooltip',

  props: {
    openOnHover: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'grey lighten-1',
    },
    zIndex: [Number, String],
    maxWidth: [Number, String],
    minWidth: [Number, String],
    modelValue: Boolean,
    offsetX: {
      type: [String, Number],
      default: 0,
    },
    offsetY: {
      type: [String, Number],
      default: 0,
    },
    ...elevationProps(),
    ...positionProps(),
    ...autoPositionProps(),
  } as any,

  setup(props, { slots }) {
    const tooltip = reactive<Partial<OffsetSizes>>({})
    const activator = reactive<Partial<OffsetSizes>>({})

    const { isActive } = useToggle(props)
    const { elevationClasses } = useElevation(props)
    const { setDetached, removeDetached } = useDetach()
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()
    const { activatorRef, getActivatorSizes, genActivatorListeners } = useActivator(props)
    const { contentRef } = useAutoPosition(props)

    const handlers = {
      mouseenter: () => (isActive.value = true),
      mouseleave: () => (isActive.value = false),
    }

    const listeners = genActivatorListeners(props, handlers)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-tooltip': true,
      'v-tooltip--top': props.top,
      'v-tooltip--right': props.right,
      'v-tooltip--left': props.left,
      'v-tooltip--bottom': props.bottom,
      ...elevationClasses.value,
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
    }))

    const computeTopPosition = computed<number>(() => {
      return (
        (props.top
          ? activator!.top! - tooltip.height!
          : props.bottom
            ? activator.top! + activator.height!
            : activator.top! + (activator.height! - tooltip.height!) / 2) +
        +props.offsetY
      )
    })

    const computeLeftPosition = computed<number>(() => {
      return (
        (props.left
          ? activator.left! - tooltip.width!
          : props.right
            ? activator.left! + activator.width!
            : activator.left! + (activator.width! - tooltip.width!) / 2) +
        +props.offsetX
      )
    })

    const styles = computed<Record<string, string>>(() => ({
      top: tooltip.top ? (convertToUnit(tooltip.top) as string) : '',
      left: tooltip.top ? (convertToUnit(tooltip.left!) as string) : '',
      maxWidth: !!props.maxWidth ? `${props.maxWidth}px` : '',
      minWidth: !!props.minWidth ? `${props.minWidth}px` : '',
      zIndex: props.zIndex,
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    function genActivator(): VNode | null {
      const slotContent = slots.activator?.({ on: listeners })

      return h(slotContent![0], { ref: activatorRef })
    }

    function genContent(): VNode {
      const propsData = {
        class: classes.value,
        style: styles.value,
        ref: contentRef,
      }

      return withDirectives(
        h('span', propsData, slots.default?.()),
        [[vShow, isActive.value]],
      )
    }

    function setTooltipPosition() {
      if (contentRef.value) {
        tooltip.width = contentRef.value!.offsetWidth
        tooltip.height = contentRef.value!.offsetHeight
        tooltip.top = computeTopPosition.value
        tooltip.left = computeLeftPosition.value
      }
    }

    onMounted(() => {
      setDetached(unref(contentRef)!)

      watch(
        () => isActive.value,
        (to) => {
          if (to) {
            const { left, top, height, width } = getActivatorSizes()

            activator.left = left as number
            activator.top = top as number
            activator.height = height as number
            activator.width = width as number

            tooltip.top = 0
            tooltip.left = 0

            requestAnimationFrame(setTooltipPosition)
          }
        },
        { immediate: true },
      )
    })

    onBeforeUnmount(() => removeDetached(unref(contentRef)!))

    return () => {
      const content = useTransition(
        genContent() as VNode,
        isActive.value ? transitions.SCALE_IN : transitions.FADE,
      )

      return [content, genActivator()]
    }
  },
})
