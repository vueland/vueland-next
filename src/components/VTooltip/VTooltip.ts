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
import { positionProps } from '../../effects/use-position'
import { useTransition } from '../../effects/use-transition'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { useColors } from '../../effects/use-colors'

// Types
import { Props } from '../../types'
import { VNode } from 'vue'

const vTooltipProps: Props = {
  offset: {
    type: Number,
    default: 12
  },
  color: {
    type: String,
    default: 'grey lighten-1'
  },
  modelValue: Boolean,
  ...positionProps(),
  ...elevationProps(),
}

export const VTooltip = defineComponent({
  name: 'v-tooltip',
  props: vTooltipProps,

  setup(props, { slots }) {
    const positions = {
      left: 0
    }

    const innerActive = ref(false)
    const tooltipRef = ref<HTMLElement | null>(null)
    const activatorRef = ref<HTMLElement | null>(null)

    const { isActive } = useToggle(props)
    const { elevationClasses } = useElevation(props)
    const { setBackground } = useColors()

    const classes = computed(() => ({
        'v-tooltip__content': true,
        'v-tooltip__content--left': props.left,
        'v-tooltip__content--bottom': props.bottom,
        ...elevationClasses.value
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
          slots.default && slots.default()
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

    const setPosition = () => {
      if (tooltipRef.value) {

        const offset = props.offset

        const activatorLeft = activatorRef.value!.offsetLeft
        const activatorTop = activatorRef.value!.offsetTop

        const activatorHeight = activatorRef.value!.offsetHeight
        const activatorWidth = activatorRef.value!.offsetWidth

        const tooltipWidth = tooltipRef.value!.offsetWidth
        const tooltipHeight = tooltipRef.value!.offsetHeight

        const top = props.top ? activatorTop - tooltipHeight : props.bottom ?
          (activatorTop + activatorHeight) : (activatorTop + (activatorHeight - tooltipHeight) / 2)

        const left = props.left ? activatorLeft - tooltipWidth : props.right ?
          (activatorLeft + activatorWidth) : (activatorLeft + (activatorWidth - tooltipWidth) / 2)

        const clearTop = Math.ceil(top) + ((props.left || props.right) ? 0 : props.top ? -offset : offset) + 'px'

        if (!positions.left) {
          positions.left = Math.ceil(left) - ((props.top || props.bottom) ? 0 : props.right ? -offset : offset)
        }

        tooltipRef.value.style.top = clearTop
        tooltipRef.value.style.left = positions.left + 'px'
      }
    }

    return () => {
      setPosition()
      return genTooltip()
    }
  },
})
