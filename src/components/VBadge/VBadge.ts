import './VBadge.scss'

// Vue API
import { defineComponent, h, computed, withDirectives, vShow } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'
import { positionProps } from '../../effects/use-position'
import { toggleProps, useToggle } from '../../effects/use-toggle'
import { elevationProps, useElevation } from '../../effects/use-elevation'
import { useTransition } from '../../effects/use-transition'

// Types
import { Props } from '../../types'

const vBadgeProps: Props = {
  dot: Boolean,
  avatar: Boolean,
  border: Boolean,
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
  ...toggleProps()
}

export const VBadge = defineComponent({
  name: 'v-badge',

  props: vBadgeProps,

  setup(props, { slots }) {

    const { elevationClasses } = useElevation(props)
    const { isActive } = useToggle(props)
    const { setBackground } = useColors()

    const offset = computed<number>(() => {
      return props.dot ? 4 : 12
    })

    const calcPosition = (offsetVal: string | number = 0): string => {
      const value = offset.value + Number(offsetVal)
      return `calc(100% - ${ value }px)`
    }

    const computedLeft = computed<string | boolean>(() => {
      if (props.right) {
        return calcPosition(props.offsetX)
      }

      return false
    })

    const computedRight = computed<string | boolean>(() => {
      if (props.left) {
        return calcPosition(props.offsetX)
      }

      return false
    })

    const computedTop = computed<string | boolean>(() => {
      if (props.bottom) {
        return calcPosition(props.offsetY)
      }

      return false
    })

    const computedBottom = computed<string | boolean>(() => {
      if (props.top) {
        return calcPosition(props.offsetY)
      }

      return false
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
        left: computedLeft.value
      }
    })


    const content = () => {
      if (props.dot) return undefined

      const slot = slots.badge
      if (slot) return slot

      if (props.content) return String(props.content)

      return undefined
    }

    const genBadge = () => {
      return withDirectives(h('span',
        setBackground(props.color, {
          class: {
            ...classes.value
          },
          style: [styles.value]
        }),
        [h('span',
          {
            class: {
              'vue-badge__content': true
            }
          }, content())
        ]),
        [[vShow, isActive.value]])
    }

    return () => {
      const slotContent = slots.default && slots.default()
      const transitionedBadge = useTransition(props, genBadge())

      return h('span', {
        class: {
          'v-badge': true
        }
      }, [h(transitionedBadge()), slotContent])
    }
  },
})
