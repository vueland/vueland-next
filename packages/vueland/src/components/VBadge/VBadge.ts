// Vue API
import { vShow, h, computed, withDirectives, defineComponent } from 'vue'

// Effects
import { positionProps } from '../../composables/use-position'
import { useColors } from '../../composables/use-colors'
import { useToggle } from '../../composables/use-toggle'
import { useElevation, elevationProps } from '../../composables/use-elevation'
import { useTransition } from '../../composables/use-transition'

// Types
import { VNode } from 'vue'

export default defineComponent({
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
    offsetY: {
      type: [String, Number],
      default: 0
    },
    offsetX: {
      type: [String, Number],
      default: 0
    },
    ...positionProps(),
    ...elevationProps(),
  } as any,

  setup(props, { slots }): () => VNode {
    const { elevationClasses } = useElevation(props)
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()

    const offset = computed<number>(() => {
      return props.dot ? 4 : 12
    })

    const calcPosition = (offsetVal: string | number = 0): string => {
      const value = offset.value - Number(offsetVal)
      return `${value}px`
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

    const badgeClasses = computed<Record<string, boolean>>(() => ({
      'v-badge__badge': true,
      ...elevationClasses.value,
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
    }))

    const styles = computed<Record<string, string | boolean>>(() => ({
      top: computedTop.value,
      right: computedRight.value,
      bottom: computedBottom.value,
      left: computedLeft.value,
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    const addContent = (): string | undefined => {
      if (props.dot) return undefined
      if (props.content) return String(props.content)

      return undefined
    }

    const genBadgeSlot = (): Maybe<VNode> => {
      const propsData = {
        class: {
          'v-badge__badge-slot': true,
        },
      }

      return slots.badge ? h('div', propsData, slots.badge()) : null
    }

    const genContent = (): VNode => {
      const propsData = {
        class: {
          'v-badge__content': true,
        },
      }

      return h('div', propsData, [addContent(), genBadgeSlot()])
    }

    const genBadge = (): VNode => {
      return h(
        'div',
        {
          class: badgeClasses.value,
          style: styles.value,
        },
        genContent()
      )
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
