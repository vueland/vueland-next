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
import { useIcons } from '../../effects/use-icons'
import { useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'

// Components
import { VIcon } from '../VIcon'
import { VListItem } from './VListItem'
import { VListItemIcon } from './index'
import { VExpandTransition } from '../transitions'

// Types
import { VNode, ComponentPublicInstance } from 'vue'
import { ListGroup } from '../../../types'

// Services

export const VListGroup = defineComponent({
  name: 'v-list-group',
  props: {
    activeClass: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
    },
    group: String,
    disabled: Boolean,
    active: Boolean,
    noAction: Boolean,
    expanded: Boolean,
    subGroup: Boolean,
    ...elevationProps(),
  } as any,

  setup(props, { slots }) {
    const { setTextColor } = useColors()
    const { elevationClasses } = useElevation(props)
    const { icons, iconSize } = useIcons('md')

    const refGroup = ref<ComponentPublicInstance<HTMLDivElement> | null>(null)
    const isActive = ref<boolean>(false)
    const childrenGroups = ref<ListGroup[]>([])
    const childrenItems = ref<any[]>([])
    const selected = ref<any[]>([])
    const { groups, register, unRegister, listClick }: any = inject('groups')

    provide('subgroups', childrenGroups)
    provide('selected', selected)
    provide('items', childrenItems)

    const subgroups: any = props.subGroup && inject('subgroups')

    const listGroup = {
      ref: refGroup,
      active: isActive,
    }

    if (groups) register(listGroup)
    if (subgroups) subgroups.value.push(listGroup)
    if (!props.active) isActive.value = true

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-group': true,
      'v-list-group__sub-group': props.subGroup,
      'v-list-group--active': props.active,
      'v-list-group--not-active': !props.active,
      'v-list-group--expanded': isActive.value,
      [props.activeClass]: isActive.value,
      ...elevationClasses.value,
    }))

    function onClick() {
      if (!props.active) return

      if (groups?.value.length) listClick(refGroup)

      if (childrenGroups.value.length) {
        childrenGroups.value.forEach((it: any) => (it.active = false))
      }
    }

    function genIcon(icon: string): VNode {
      const propsData = {
        size: iconSize,
      }

      return h(VIcon, propsData, {
        default: () => icon,
      })
    }

    function genAppendIcon(): VNode | null {
      const slotAppendIcon = slots.appendIcon && slots.appendIcon()

      const propsAppendIcon =
        !props.subGroup && (props.appendIcon || icons.$expand)

      if ((!propsAppendIcon && !slotAppendIcon) || props.subGroup) return null

      const propsData = {
        class: 'v-list-group__append-icon',
      }

      return h(VListItemIcon, propsData, {
        default: () => slotAppendIcon || genIcon(propsAppendIcon as string),
      })
    }

    function genPrependIcon(): VNode | null {
      const icon = props.subGroup ? icons.$subgroup : props.prependIcon

      const slotIcon = slots.prependIcon && slots.prependIcon()

      if (!icon && !slotIcon) return null

      const propsData = {
        class: 'v-list-group__prepend-icon',
      }

      return h(VListItemIcon, propsData, {
        default: () => slotIcon || genIcon(icon as string),
      })
    }

    function genGroupHeader(): VNode {
      const propsData = {
        class: {
          'v-list-group__header': !props.subGroup,
          'v-list-group__header--sub-group': props.subGroup,
        },
        onClick,
      }

      return h(VListItem, propsData, {
        default: () => [
          genPrependIcon(),
          slots.title && slots.title(),
          genAppendIcon(),
        ],
      })
    }

    function genItems(): VNode {
      const propsData = {
        class: 'v-list-group__items',
      }

      return withDirectives(
        h('div', propsData, slots.default && slots.default()),
        [[vShow, isActive.value]]
      )
    }

    function genPropsData() {
      return {
        class: classes.value,
        ref: refGroup,
      }
    }

    onBeforeUnmount(() => {
      unRegister(refGroup)
    })

    return () => {
      const items = slots.default && VExpandTransition(genItems())
      const header = slots.title && genGroupHeader()

      const propsData = props.color
        ? setTextColor(props.color, genPropsData())
        : genPropsData()

      const children = [header, items]

      return h('div', propsData, children)
    }
  },
})
