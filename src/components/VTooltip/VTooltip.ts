// Styles
import './VTooltip.scss'

// Vue API
import {
  h,
  ref,
  reactive,
  watch,
  computed,
  withDirectives,
  defineComponent,
  onMounted,
  vShow,
} from 'vue'

// Effects
import { useToggle } from '../../effects/use-toggle'
import { useColors } from '../../effects/use-colors'
import { useActivator } from '../../effects/use-activator'
import { useTransition } from '../../effects/use-transition'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { positionProps } from '../../effects/use-position'

// Types
import { OffsetSizes } from '../../../types'
import { VNode } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

// Services
import { Transitions } from '../../services/transitions'

// TODO fix behavior on window resize if v-model used on component

export const VTooltip = defineComponent({
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
    ...elevationProps(),
    ...positionProps(),
  } as any,

  setup(props, { slots }) {
    const tooltip = reactive<Partial<OffsetSizes>>({})
    const activator = reactive<Partial<OffsetSizes>>({})

    const tooltipRef = ref<HTMLElement | null>(null)

    const { isActive } = useToggle(props)
    const { elevationClasses } = useElevation(props)
    const { setBackground } = useColors()
    const {
      activatorRef,
      getActivatorSizes,
      genActivatorListeners,
    } = useActivator()

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
      left: tooltip.top ? (convertToUnit(tooltip.left) as string) : '',
      maxWidth: !!props.maxWidth ? `${props.maxWidth}px` : '',
      minWidth: !!props.minWidth ? `${props.minWidth}px` : '',
      zIndex: props.zIndex,
    }))

    function genActivator(): VNode | null {
      const slotContent =
        slots.activator &&
        slots.activator({
          on: listeners,
        })

      return h(slotContent![0], { ref: activatorRef })
    }

    function genContent(): VNode {
      const propsData = {
        class: classes.value,
        style: styles.value,
        ref: tooltipRef,
      }

      return withDirectives(
        h(
          'span',
          setBackground(props.color, propsData),
          slots.default && slots.default()
        ),
        [[vShow, isActive.value]]
      )
    }

    function setTooltipPosition() {
      if (tooltipRef.value) {
        tooltip.width = tooltipRef.value!.offsetWidth
        tooltip.height = tooltipRef.value!.offsetHeight
        tooltip.top = computeTopPosition.value
        tooltip.left = computeLeftPosition.value
      }
    }

    onMounted(() => {
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
        { immediate: true }
      )
    })

    return () => {
      const content = useTransition(
        genContent() as VNode,
        isActive.value ? Transitions.SCALE_IN : Transitions.FADE
      )

      return [content, genActivator()]
    }
  },
})
