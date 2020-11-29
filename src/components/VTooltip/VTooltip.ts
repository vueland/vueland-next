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

// Types
import { Props } from '../../types'
import { VNode } from 'vue'

const vTooltipProps: Props = {
  modelValue: Boolean,
  ...positionProps(),
}

export const VTooltip = defineComponent({
  name: 'v-tooltip',
  props: vTooltipProps,

  setup(props, { slots }) {
    const { isActive } = useToggle(props)
    const innerActive = ref(false)
    const tooltipRef = ref(null)
    const activatorRef = ref(null)

    const classes = computed(() => ({
        'v-tooltip__content': true,
        'v-tooltip__content--left': props.left,
        'v-tooltip__content--bottom': props.bottom,
      }),
    )

    const activator = () => {
      innerActive.value = !innerActive.value
    }

    const genActivator = (): VNode | null => {
      return h('div', {
        class: 'v-tooltip__activator',
        ref: activatorRef,
      }, renderSlot(slots, 'activator', { on: activator }))
    }

    const genContent = () => {
      if (isActive.value || innerActive.value) {
        return h('span', {
          class: classes.value,
          ref: tooltipRef,
        }, slots.default && slots.default())
      }
      return null
    }

    const genTooltip = () => {
      return h('div', {
          class: 'v-tooltip',
        },
        [
          genActivator(),
          useTransition({ transition: innerActive.value ? 'scaleIn' : 'fade' }, genContent() as VNode),
        ],
      )
    }

    const setPosition = () => {
      if (tooltipRef.value) {
        const activatorWidth = (activatorRef.value as any)!.offsetWidth
        const tooltipWidth = (tooltipRef.value! as any).offsetWidth
        const tooltipHeight = (tooltipRef.value! as any).offsetHeight

        {
          (tooltipRef.value as any)!.style.left = ((activatorWidth / 2) - (tooltipWidth / 2)) + 'px'
        }

      }
    }

    return () => {
      setPosition()
      return genTooltip()
    }
  },
})
