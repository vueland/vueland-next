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
  defineComponent,
} from 'vue'

// Effects
import { useToggle } from '../../effects/use-toggle'
import { useColors } from '../../effects/use-colors'
import { useActivator } from '../../effects/use-activator'
import { useTransition } from '../../effects/use-transition'
import { positionProps } from '../../effects/use-position'
import { elevationProps, useElevation } from '../../effects/use-elevation'

// Types
import { Props } from '../../types'
import { VNode } from 'vue'

//
import { convertToUnit } from '../../helpers'

const vTooltipProps: Props = {
  offset: {
    type: [Number, String],
    default: 12,
  },
  color: {
    type: String,
    default: 'grey lighten-1',
  },
  modelValue: Boolean,
  ...positionProps(),
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

    watch(() => isActive.value,
      to => innerActive.value = to,
      { immediate: true }
    )

    const activator = () => {
      innerActive.value = !innerActive.value
    }

    const genActivator = (): VNode | null => {
      return h('span', {
        class: 'v-tooltip__activator',
        ref: activatorRef,
      }, renderSlot(slots, 'activator', { on: activator }))
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
      if (innerActive.value) {
        return h('span',
          setBackground(props.color, genContentDataProps()),
          slots.default && slots.default(),
        )
      }

      return null
    }

    const genTooltip = () => {

      return h('div', {
          class: 'v-tooltip',
        },
        [
          genActivator(),
          useTransition(
            { transition: innerActive.value ? 'scaleIn' : 'fade' },
            genContent() as VNode),
        ],
      )
    }

    const setTooltipPosition = () => {

      if (tooltipRef.value) {
        const { activatorSizes } = setActivatorSizes()
        const offset = +props.offset

        tooltip.width = tooltipRef.value!.offsetWidth
        tooltip.height = tooltipRef.value!.offsetHeight

        const top = props.top ?
          activatorSizes.offsetTop! - tooltip.height : props.bottom ?
            (activatorSizes.offsetTop! + activatorSizes.offsetHeight!) :
            (activatorSizes.offsetTop! + (activatorSizes.offsetHeight! - tooltip.height) / 2)

        const left = props.left ?
          activatorSizes.offsetLeft! - tooltip.width : props.right ?
            (activatorSizes.offsetLeft! + activatorSizes.offsetWidth!) :
            (activatorSizes.offsetLeft! + (activatorSizes.offsetWidth! - tooltip.width) / 2)

        tooltip.top = Math.ceil(top + ((props.left || props.right) ?
          0 : props.top ? -offset : offset)
        )

        tooltip.left = Math.ceil(left - ((props.top || props.bottom) ?
          0 : props.right ? -offset : offset)
        )
      }
    }

    return () => {
      requestAnimationFrame(setTooltipPosition)
      return genTooltip()
    }
  },
})
