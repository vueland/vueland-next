// Styles
import './VTooltip.scss'

// Vue API
import {
  h,
  ref,
  reactive,
  watch,
  computed,
  renderSlot,
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

// Types
import { Props } from '../../types'
import { OffsetSizes } from '../../types'
import { VNode } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

const vTooltipProps: Props = {
  top: Boolean,
  right: Boolean,
  bottom: Boolean,
  left: Boolean,
  openOnHover: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: [Number, String],
    default: 12,
  },
  color: {
    type: String,
    default: 'grey lighten-1',
  },
  modelValue: Boolean,
  ...elevationProps(),
}

// TODO fix behavior on window resize if v-model used on component

export const VTooltip = defineComponent({
  name: 'v-tooltip',
  props: vTooltipProps,

  setup(props, { slots }): () => VNode {
    const tooltip = reactive<Partial<OffsetSizes>>({})
    const activator = reactive<Partial<OffsetSizes>>({})

    const innerActive = ref<boolean>(false)
    const tooltipRef = ref<HTMLElement | null>(null)

    const { isActive } = useToggle(props)
    const { elevationClasses } = useElevation(props)
    const { setBackground } = useColors()
    const { activatorRef, getActivatorSizes, genActivatorListeners } = useActivator()

    const listeners = genActivatorListeners(props, innerActive)

    const classes = computed<Record<string, boolean>>(() => ({
        'v-tooltip__content': true,
        'v-tooltip--left': props.left,
        'v-tooltip--bottom': props.bottom,
        ...elevationClasses.value,
      }),
    )

    const genActivator = (): VNode | null => {
      const slotContent = renderSlot(
        slots,
        'activator',
        {
          on: listeners,
        }
      )

      return h('div', {
        class: 'v-tooltip__activator',
        ref: activatorRef,
      }, slotContent)
    }

    const genContentDataProps = (): Record<string, any> => {
      return {
        class: classes.value,
        style: {
          top: tooltip.top ? convertToUnit(tooltip.top) : '',
          left: tooltip.top ? convertToUnit(tooltip.left) : '',
        },
        ref: tooltipRef,
      }
    }

    const genContent = (): VNode => {
      return withDirectives(h(
        'span',
        setBackground(props.color, genContentDataProps()),
        slots.default && slots.default(),
      ), [[vShow, innerActive.value]])
    }

    const genTooltip = (): VNode => {
      const content = useTransition(
        { transition: innerActive.value ? 'scaleIn' : 'fade' },
        genContent() as VNode,
      )

      return h('div', {
          class: 'v-tooltip',
        }, [genActivator(), content],
      )
    }

    const computeTopPosition = computed<number>(() => {
      return props.top ?
        activator!.top! - tooltip.height! : props.bottom ?
          (activator.top! + activator.height!) :
          (activator.top! + (activator.height! - tooltip.height!) / 2)
    })

    const computeLeftPosition = computed<number>(() => {
      return props.left ?
        activator.left! - tooltip.width! : props.right ?
          (activator.left! + activator.width!) :
          (activator.left! + (activator.width! - tooltip.width!) / 2)
    })

    const setTooltipPosition = () => {
      if (tooltipRef.value) {
        const { offset, left, right, top, bottom } = props

        tooltip.width = tooltipRef.value!.offsetWidth
        tooltip.height = tooltipRef.value!.offsetHeight

        tooltip.top = computeTopPosition.value +
          ((left || right) ? 0 : top ? -offset : offset)

        tooltip.left = computeLeftPosition.value -
          ((top || bottom) ? 0 : right ? -offset : offset)
      }
    }

    watch(() => isActive.value,
      to => innerActive.value = to,
      { immediate: true },
    )

    onMounted(() => {
      watch(() => innerActive.value, to => {
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
      }, { immediate: true })
    })

    return () => genTooltip()
  },
})
