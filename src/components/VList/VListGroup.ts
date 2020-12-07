// Styles
import './VListGroup.scss'

// Vue API
import {
  h,
  ref,
  computed,
  provide,
  inject,
  withDirectives,
  defineComponent,
  onBeforeUnmount,
  vShow,
} from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VIcon } from '../VIcon'
import { VListItem } from './VListItem'
import { VListItemIcon } from './index'
import { VExpandTransition } from '../transitions'

// Types
import { VNode } from 'vue'

// Services
import { FaIcons } from '../../services/icons'
import { Sizes } from '../../services/sizes'

const vListGroupProps: any = {
  activeClass: {
    type: String,
    default: '',
  },
  appendIcon: {
    type: String,
    default: FaIcons.$expand,
  },
  prependIcon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
  },
  disabled: Boolean,
  group: String,
  noAction: Boolean,
  subGroup: Boolean,
}

export const VListGroup = defineComponent({
  name: 'v-list-group',
  props: vListGroupProps,

  setup(props, { slots, emit }) {
    const { setTextColor } = useColors()

    const refGroup = ref(null)
    const isActive = ref(false)
    const children = ref([])
    const groups: any = inject('groups')

    provide('subgroups', children)

    const subgroups: any = props.subGroup && inject('subgroups')

    const currentGroup = {
      ref: refGroup,
      active: isActive,
    }

    groups && groups.register(currentGroup)

    subgroups && subgroups.value.push(currentGroup)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-group': true,
      'v-list-group__sub-group': props.subGroup,
      'v-list-group--expanded': isActive.value && !props.noAction,
      [props.activeClass]: isActive.value,
    }))

    const onClick = () => {
      if (props.noAction) return

      groups?.items.length && groups.listClick(refGroup)

      children.value.length &&
        children.value.forEach((it: any) => (it.active = false))

      emit('click')
    }

    const genIcon = (icon: string): VNode => {
      const dataProps = {
        size: Sizes.small,
      }

      return h(VIcon, dataProps, {
        default: () => icon,
      })
    }

    const genAppendIcon = (): VNode | null => {
      const slotIcon = slots.appendIcon && slots.appendIcon()
      const icon = !props.subGroup && !props.noAction ? props.appendIcon : false

      if (!icon && !slotIcon) return null

      const dataProps = {
        class: {
          'v-list-group__append-icon': true,
        },
      }

      return h(VListItemIcon, dataProps, {
        default: () => slotIcon || genIcon(icon as string),
      })
    }

    const genPrependIcon = (): VNode | null => {
      const icon =
        props.subGroup && !props.noAction
          ? FaIcons.$subgroup
          : props.prependIcon

      const slotIcon = slots.prependIcon && slots.prependIcon()

      if (!icon && !slotIcon) return null

      const dataProps = {
        class: {
          'v-list-group__prepend-icon': true,
        },
      }

      return h(VListItemIcon, dataProps, {
        default: () => slotIcon || genIcon(icon as string),
      })
    }

    const genGroupHeader = (): VNode => {
      const dataProps = {
        class: {
          'v-list-group__header': !props.subGroup,
          'v-list-group__header--sub-group': props.subGroup,
        },
        onClick,
      }

      return h(VListItem, dataProps, {
        default: () => [
          genPrependIcon(),
          slots.title && slots.title(),
          genAppendIcon(),
        ],
      })
    }

    const genItems = (): VNode => {
      const dataProps = {
        class: {
          'v-list-group__items': true,
        },
      }

      return withDirectives(
        h('div', dataProps, slots.default && slots.default()),
        [[vShow, isActive.value]],
      )
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
      const items = slots.default && VExpandTransition(genItems())
      const header = slots.title && genGroupHeader()

      const dataProps = props.color
        ? setTextColor(props.color, genDataProps())
        : genDataProps()

      const children = [header, items]

      return h('div', dataProps, children)
    }
  },
})
