// Styles
import './VListGroup.scss'

// Vue API
import {
  h,
  ref,
  computed,
  inject,
  withDirectives,
  defineComponent,
  onBeforeUnmount,
  vShow,
} from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'
import { VExpandTransition } from '../transitions'

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
      'v-list-group__subgroup': props.subGroup
    }))

    const genIcon = (icon: string) => {
      return h(
        VIcon,
        {
          size: 14,
        },
        {
          default: () => icon
        },
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
        {
          default: () => slotIcon || genIcon(icon as string),
        }
      )
    }

    const genPrependIcon = () => {
      const icon = props.prependIcon ? props.prependIcon : false
      const slotIcon = slots.prependIcon && slots.prependIcon()

      if (!icon && !slotIcon) return null

      return h(
        VListItemIcon,
        {
          class: {
            'v-list-group__prepend-icon': true,
          },
        },
        {
          default: () => slotIcon || genIcon(icon as string),
        }
      )
    }

    const clickHandler = () => {
      !props.subGroup && groups.listClick(refGroup)
    }

    const genGroupHeader = () => {
      return h(
        VListItem,
        {
          onClick: clickHandler,
          class: {
            'v-list-group__header': !props.subGroup,
            'v-list-group__header--sub-group': props.subGroup,
          },
        },
        {
          default: () => [
            genPrependIcon(),
            slots.activator && slots.activator(),
            genAppendIcon(),
          ],
        },
      )
    }

    const genItems = () => {
      return withDirectives(h(
        'div',
        {
          class: {
            'v-list-group__items': true,
          },
        },
        slots.default && slots.default(),
      ), [[vShow, isActive.value]])
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

    return () => {
      const items = VExpandTransition(genItems())
      return h('div', setTextColor(props.color, genDataProps()), [
        genGroupHeader(),
        items,
      ])
    }
  },
})
