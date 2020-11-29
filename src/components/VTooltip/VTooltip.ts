// Styles
import './VTooltip.scss'

// Vue API
import {
  h,
  ref,
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

const vTooltipProps: Props = {
  offset: {
    type: Number,
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

    const tooltip = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    }

    const innerActive = ref(false)
    const tooltipRef = ref<HTMLElement | null>(null)

    const { isActive } = useToggle(props)
    const { elevationClasses } = useElevation(props)
    const { setBackground } = useColors()
    const { activatorRef, setActivatorSizes } = useActivator()

    const classes = computed(() => ({
        'v-tooltip__content': true,
        'v-tooltip__content--left': props.left,
        'v-tooltip__content--bottom': props.bottom,
        ...elevationClasses.value,
      }),
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
        ref: tooltipRef,
      }
    }

    const genContent = () => {
      if (isActive.value || innerActive.value) {
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
        const offset = props.offset

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

        tooltip.top = Math.ceil(top + ((props.left || props.right) ? 0 : props.top ? -offset : offset))
        tooltip.left = Math.ceil(left - ((props.top || props.bottom) ? 0 : props.right ? -offset : offset))

        tooltipRef.value.style.top = tooltip.top + 'px'
        tooltipRef.value.style.left = tooltip.left + 'px'
      }
    }

    return () => {
      setTooltipPosition()
      return genTooltip()
    }
  },
})
