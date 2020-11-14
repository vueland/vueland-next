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
import { VExpandTransition } from '../transitions'

// Components
import { VIcon } from '../VIcon'
import { VListItem } from './VListItem'
import { VListItemIcon } from './index'

// Services
import { FaIcons } from '../../services/icons'
import { Sizes } from '@/services/sizes'

const vListGroupProps = {
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
    default: 'primary',
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
    const groups: any = !props.noAction && inject('groups')

    provide('subgroups', children)

    const subgroups: any = props.subGroup && inject('subgroups')

    groups && groups.register({
      ref: refGroup,
      activator: isActive,
    })

    subgroups && subgroups.value.push({
      ref: refGroup,
      activator: isActive,
    })

    const clickHandler = () => {
      !props.noAction && groups.listClick(refGroup)
      !props.noAction && children.value.forEach((it: any) => {
        it.activator = false
      })

      emit('click')
    }

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-group': true,
      'v-list-group__sub-group': props.subGroup,
      'v-list-group--active': isActive.value,
    }))

    const genIcon = (icon: string) => {
      return h(
        VIcon,
        {
          size: Sizes.small,
        },
        {
          default: () => icon,
        },
      )
    }

    const genAppendIcon = () => {
      const slotIcon = slots.appendIcon && slots.appendIcon()
      const icon = !props.subGroup ? props.appendIcon : false

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
        },
      )
    }

    const genPrependIcon = () => {
      const icon = props.subGroup && !props.noAction ? FaIcons.$subgroup : props.prependIcon
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
        },
      )
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
            slots.title && slots.title(),
            genAppendIcon(),
          ],
        },
      )
    }

    const genItems = () => {
      return withDirectives(
        h(
          'div',
          {
            class: {
              'v-list-group__items': true,
            },
          },
          slots.default && slots.default(),
        ),
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
      const items = VExpandTransition(genItems())
      return h('div', setTextColor(props.color, genDataProps()), [
        genGroupHeader(),
        items,
      ])
    }
  },
})
