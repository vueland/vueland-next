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
  vShow
} from 'vue'

// Effects
import { useToggle } from '../../effects/use-toggle'
import { useColors } from '../../effects/use-colors'
import { useActivator } from '../../effects/use-activator'
import { useTransition } from '../../effects/use-transition'
import { elevationProps, useElevation } from '../../effects/use-elevation'

// Types
import { Props } from '../../types'
import { VNode } from 'vue'

// Helpers
import { convertToUnit } from '../../helpers'

const vTooltipProps: Props = {
  top: Boolean,
  right: Boolean,
  bottom: Boolean,
  left: Boolean,
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

export const VTooltip = defineComponent({
  name: 'v-tooltip',
  props: vTooltipProps,

  setup(props, { slots }) {

    const tooltip = reactive({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    })

    const innerActive = ref(false)
    const tooltipRef = ref<HTMLElement | null>(null)

    const { isActive } = useToggle(props)
    const { elevationClasses } = useElevation(props)
    const { setBackground } = useColors()
    const { activatorRef, setActivatorSizes } = useActivator()

    const classes = computed(() => ({
        'v-tooltip__content': true,
        'v-tooltip--left': props.left,
        'v-tooltip--bottom': props.bottom,
        ...elevationClasses.value,
      }),
    )

    const on = () => {
      innerActive.value = !innerActive.value
    }

    const genActivator = (): VNode | null => {
      return h('span', {
        class: 'v-tooltip__activator',
        ref: activatorRef,
      }, renderSlot(slots, 'activator', { on }))
    }

    const genContentDataProps = () => {
      return {
        class: classes.value,
        style: {
          top: tooltip.top ? convertToUnit(tooltip.top) : '',
          left: tooltip.top ? convertToUnit(tooltip.left) : ''
        },
        ref: tooltipRef,
      }
    }

    const genContent = () => {
      return withDirectives(h(
        'span',
        setBackground(props.color, genContentDataProps()),
        slots.default && slots.default(),
      ), [[vShow, innerActive.value]])
    }

    const genTooltip = () => {
      const content = useTransition(
        { transition: innerActive.value ? 'scaleIn' : 'fade' },
        genContent() as VNode
      )

      return h('div', {
          class: 'v-tooltip',
        }, [genActivator(), content],
      )
    }

    const computeTopPosition = (activator, tooltip) => {
      return props.top ?
        activator.offsetTop! - tooltip.height : props.bottom ?
          (activator.offsetTop! + activator.offsetHeight!) :
          (activator.offsetTop! + (activator.offsetHeight! - tooltip.height) / 2)
    }

    const computeLeftPosition = (activator, tooltip) => {
      return props.left ?
        activator.offsetLeft! - tooltip.width : props.right ?
          (activator.offsetLeft! + activator.offsetWidth!) :
          (activator.offsetLeft! + (activator.offsetWidth! - tooltip.width) / 2)
    }

    const setTooltipPosition = () => {

      if (tooltipRef.value) {
        tooltip.width = tooltipRef.value!.offsetWidth
        tooltip.height = tooltipRef.value!.offsetHeight

        const { activatorSizes } = setActivatorSizes()
        const offset = +props.offset

        const top = computeTopPosition(activatorSizes, tooltip)
        const left = computeLeftPosition(activatorSizes, tooltip)

        tooltip.top = top + ((props.left || props.right) ?
            0 : props.top ? -offset : offset
        )

        tooltip.left = left - ((props.top || props.bottom) ?
            0 : props.right ? -offset : offset
        )
      }
    }

    watch(() => isActive.value,
      to => innerActive.value = to,
      { immediate: true }
    )

    watch(() => innerActive.value, to => {
      if (to) {
        tooltip.top = 0
        tooltip.left = 0
        requestAnimationFrame(setTooltipPosition)
      }
    })

    return () => genTooltip()
  },
})
