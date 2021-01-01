import './VBadge.scss'

// Vue API
import { vShow, h, computed, withDirectives, defineComponent } from 'vue'

// Effects
import { positionProps } from '../../effects/use-position'
import { useColors } from '../../effects/use-colors'
import { useToggle } from '../../effects/use-toggle'
import { useElevation, elevationProps } from '../../effects/use-elevation'
import { useTransition } from '../../effects/use-transition'

// Types
import { VNode } from 'vue'

export const VBadge = defineComponent({
  name: 'v-badge',

  props: {
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
  } as any,

  setup(props, { slots }): () => VNode {
    const { elevationClasses } = useElevation(props)
    const { setBackground } = useColors()

    const offset = computed<number>(() => {
      return props.dot ? 4 : 12
    })

    const calcPosition = (offsetVal: string | number = 0): string => {
      const value = -offset.value - Number(offsetVal)
      return `${ value }px`
    }

    const computedLeft = computed<string | boolean>(() => {
      return props.left && calcPosition(props.offsetX)
    })

    const computedRight = computed<string | boolean>(() => {
      return props.right && calcPosition(props.offsetX)
    })

    const computedTop = computed<string | boolean>(() => {
      return props.top && calcPosition(props.offsetY)
    })

    const computedBottom = computed<string | boolean>(() => {
      return props.bottom && calcPosition(props.offsetY)
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-badge': true,
      'v-badge--border': props.border,
      'v-badge--dot': props.dot,
      'v-badge--avatar': props.avatar,
    }))

    const badgeClasses = computed<Record<string, boolean>>(() => {
      return {
        'v-badge__badge': true,
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

    function addContent(): string | undefined {
      if (props.dot) return undefined
      if (props.content) return String(props.content)

      return undefined
    }

    function genBadgeSlot(): VNode | null {
      const propsData = {
        class: {
          'v-badge__badge-slot': true,
        },
      }

      return slots.badge ? h('div',
        propsData, slots.badge()) : null
    }

    function genContent(): VNode {
      const propsData = {
        class: {
          'v-badge__content': true,
        },
      }

      return h('div', propsData, [addContent(), genBadgeSlot()])
    }

    function genBadge(): VNode {
      const propsData = setBackground(
        props.color, {
          class: badgeClasses.value,
          style: styles.value,
        },
      )

      return h('div', propsData, genContent())
    }

    return () => {
      let badge = genBadge()

      if (props.toggle && !slots.badge) {
        const { isActive } = useToggle(props, 'content')
        badge = withDirectives(badge, [[vShow, isActive.value]])
      }

      const propsData = {
        class: classes.value,
      }

      const children = [
        useTransition(badge, props.transition),
        slots.default && slots.default(),
      ]

      return h('div', propsData, children)
    }
  },
})
