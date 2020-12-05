import './VBadge.scss'

// Vue API
import {
  vShow,
  h,
  computed,
  withDirectives,
  defineComponent,
} from 'vue'

// Effects
import { positionProps } from '../../effects/use-position'
import { useColors } from '../../effects/use-colors'
import { useToggle } from '../../effects/use-toggle'
import { useElevation, elevationProps } from '../../effects/use-elevation'
import { useTransition } from '../../effects/use-transition'

// Types
import { Props } from '../../types'
import { VNode } from 'vue'

const vBadgeProps: Props = {
  dot: Boolean,
  avatar: Boolean,
  border: Boolean,
  toggle: Boolean,
  content: {
    required: false,
  },
  color: {
    type: String,
    default: 'primary',
  },
  transition: {
    type: String,
    default: 'scaleIn',
  },
  ...positionProps(),
  ...elevationProps(),
}

export const VBadge = defineComponent({
  name: 'v-badge',

  props: vBadgeProps,

  setup(props, { slots }): () => VNode {
    const { elevationClasses } = useElevation(props)
    const { setBackground } = useColors()

    const offset = computed<number>(() => {
      return props.dot ? 4 : 12
    })

    const calcPosition = (offsetVal: string | number = 0): string => {
      const value = offset.value + Number(offsetVal)
      return `calc(100% - ${value}px)`
    }

    const computedLeft = computed<string | boolean>(() => {
      return props.right && calcPosition(props.offsetX)
    })

    const computedRight = computed<string | boolean>(() => {
      return props.left && calcPosition(props.offsetX)
    })

    const computedTop = computed<string | boolean>(() => {
      return props.bottom && calcPosition(props.offsetY)
    })

    const computedBottom = computed<string | boolean>(() => {
      return props.top && calcPosition(props.offsetY)
    })

    const classes = computed<Record<string, boolean>>(() => {
      return {
        'v-badge__badge': true,
        'v-badge--border': props.border,
        'v-badge--dot': props.dot,
        'v-badge--avatar': props.avatar,
        ...elevationClasses.value,
      }
    })

    const styles = computed<Record<string, string | boolean>>(() => {
      return {
        top: computedTop.value,
        right: computedRight.value,
        bottom: computedBottom.value,
        left: computedLeft.value,
      }
    })

    const genContent = (): string | undefined => {
      if (props.dot) return undefined

      if (props.content) return String(props.content)

      return undefined
    }

    const genBadgeSlot = (): VNode => {
      return h(
        'div',
        {
          class: 'v-badge__badge-slot',
        },
        slots.badge && slots.badge(),
      )
    }

    const genBadge = (): VNode => {
      return h(
        'div',
        setBackground(props.color, {
          class: classes.value,
          style: [styles.value],
        }),
        [
          h('div', {
              class: 'v-badge__content',
            }, [genContent(), genBadgeSlot()],
          ),
        ],
      )
    }

    return (): VNode => {
      let badge = genBadge()

      if (props.toggle && !slots.badge) {
        const { isActive } = useToggle(props, 'content')

        badge = withDirectives(badge, [[vShow, isActive.value]])
      }

      const slotContent = slots.default && slots.default()
      const transitionedBadge = useTransition(props, badge)

      return h('div', {
          class: 'v-badge',
        }, [h(transitionedBadge), slotContent],
      )
    }
  },
})
