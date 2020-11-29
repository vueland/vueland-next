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
import { positionProps, usePosition } from '../../effects/use-position'
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
    const { positionClasses } = usePosition(props)
    const { isActive } = useToggle(props)
    const innerActive = ref(false)

    const classes = computed(() => ({
        'v-tooltip__content': true,
        ...positionClasses.value,
      }),
    )

    const activator = () => {
      innerActive.value = !innerActive.value
    }

    const genActivator = (): VNode | null => {
      return h('div', {
        class: 'v-tooltip--activator',
      }, renderSlot(slots, 'activator', { on: activator }))

    }

    const genContent = () => {
      if (isActive.value || innerActive.value) {
        return h('span', {
          class: classes.value,
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
          genContent(),
        ],
      )
    }

    return () => genTooltip()
  },
})
