// Styles
import './VListGroup.scss'

// Vue API
import { h, ref, computed, inject, defineComponent, onBeforeUnmount } from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VIcon } from '../VIcon'
import { VListItem } from './VListItem'
import { VListItemIcon } from './index'

// Services
// import { FaIcons } from '../../services/icons'

const vListGroupProps = {
  activeClass: {
    type: String,
    default: '',
  },
  appendIcon: String,
  color: {
    type: String,
    default: 'primary',
  },
  disabled: Boolean,
  group: String,
  noAction: Boolean,
  prependIcon: String,
  subGroup: Boolean,
}

export const VListGroup = defineComponent({
  name: 'v-list-group',
  props: vListGroupProps,

  setup(props, { slots }) {
    const { setTextColor } = useColors()

    const refGroup = ref(null)
    const isActive = ref(false)

    const groups: any = inject('groups')

    !props.noAction &&
    groups.register({
      ref: refGroup,
      activator: isActive,
    })

    const classes = computed(() => ({
      'v-list-group': true,
      'v-list-group--active': isActive.value,
    }))

    const genIcon = (icon: string) => {
      return h(
        VIcon,
        {
          size: 14,
        },
        icon,
      )
    }

    const genAppendIcon = () => {
      const icon = !props.subGroup ? props.appendIcon : false
      const slotIcon = slots.appendIcon && slots.appendIcon()

      if (!icon && !slotIcon) return null

      return h(
        VListItemIcon,
        {
          class: {
            'v-list-group__append-icon': true,
          },
        },
        slotIcon || genIcon(icon as string),
      )
    }

    // const genPrependIcon = () => {
    // }

    const clickHandler = () => {
      groups.listClick(refGroup)
    }

    const genGroupHeader = () => {
      return h(
        VListItem,
        {
          onClick: clickHandler,
          class: {
            'v-list-group__header': true
          }
        },
        {
          default: () => [
            slots.activator && slots.activator(),
            genAppendIcon(),
          ],
        },
      )
    }

    const genItems = () => {
      return h('div', {
        class: {
          'v-list-group__items': true
        }
      }, slots.default && slots.default())
    }

    const genDataProps = () => {
      return {
        class: classes.value,
        ref: refGroup,
      }
    }


    onBeforeUnmount(() => {
      groups.unRegister(refGroup)
    })

    return () =>
      h('div', setTextColor(props.color, genDataProps()), [genGroupHeader(), genItems()])
  },
})
