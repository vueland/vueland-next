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

const vBadgeProps: any = {
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

    const addContent = (): string | undefined => {
      if (props.dot) return undefined
      if (props.content) return String(props.content)

      return undefined
    }

    const genBadgeSlot = (): VNode | null => {
      const dataProps = {
        class: {
          'v-badge__badge-slot': true,
        },
      }

      return slots.badge ? h('div', dataProps,  slots.badge()) : null
    }

    const genContent = () => {
      const dataProps = {
        class: {
          'v-badge__content': true,
        },
      }

      return h('div', dataProps, [addContent(), genBadgeSlot()])
    }

    const genBadge = (): VNode => {
      const dataProps = setBackground(props.color, {
        class: classes.value,
        style: styles.value,
      })

      return h('div', dataProps, genContent())
    }

    return (): VNode => {
      let badge = genBadge()

      if (props.toggle && !slots.badge) {
        const { isActive } = useToggle(props, 'content')
        badge = withDirectives(badge, [[vShow, isActive.value]])
      }

      const dataProps = {
        class: 'v-badge',
      }

      const children = [
        useTransition(props, badge),
        slots.default && slots.default(),
      ]

      return h('div', dataProps, children)
    }
  },
})
