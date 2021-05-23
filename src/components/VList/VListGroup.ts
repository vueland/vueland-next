// Styles
import './VListGroup.scss'

// Vue API
import {
  h,
  ref,
  computed,
  withDirectives,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  vShow,
} from 'vue'

// Effects
import { useIcons } from '../../effects/use-icons'
import { useColors } from '../../effects/use-colors'
import { useGroup } from '../../effects/use-group'
import { elevationProps, useElevation } from '../../effects/use-elevation'

// Components
import { VIcon } from '../VIcon'
import { VListItem } from './VListItem'
import { VListItemIcon } from './index'
import { VExpandTransition } from '../transitions'

// Types
import { VNode, ComponentPublicInstance, Ref } from 'vue'
import { Group } from '../../../types'

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
      default: '',
    },
    group: String,
    disabled: Boolean,
    active: Boolean,
    noAction: Boolean,
    expanded: Boolean,
    subGroup: Boolean,
    value: Boolean,
    ...elevationProps(),
  } as any,

  setup(props, { slots }) {
    const { setTextColor } = useColors()
    const { elevationClasses } = useElevation(props)
    const { icons, iconSize } = useIcons('md')
    const { injectGroup, provideGroup } = useGroup()

    const refGroup: Ref<HTMLElement | ComponentPublicInstance | null> = ref(
      null
    )
    const isActive = ref<boolean>(false)
    const childrenGroups = ref<Group[]>([])

    provideGroup('subgroups')
    provideGroup('selected')
    provideGroup('items')

    const subgroups: any = props.subGroup && injectGroup('subgroups')

    const listGroups = injectGroup('list-groups')
    const listGroup = genListGroupParams()

    const isNotActive = computed<boolean>(() => {
      return !props.subGroup && !props.active
    })

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
      if (isNotActive.value) return

      if (listGroups) listGroups.listClick(listGroup)

      if (childrenGroups.value.length) {
        childrenGroups.value.forEach((it: any) => (it.active = false))
      }
    }

    function genListGroupParams<T extends keyof Group>() {
      return {
        ref: refGroup as Ref<Group[T]>,
        active: isActive as Ref<Group[T]>,
      }
    }

    function genIcon(icon: string): VNode {
      const propsData = {
        size: iconSize,
      }

      return h(VIcon, propsData, { default: () => icon })
    }

    function genAppendIcon(): VNode | null {
      const slotAppendIcon = slots.appendIcon && slots.appendIcon()

      const propsAppendIcon = !props.subGroup
        ? props.active
          ? icons.$expand
          : props.appendIcon
        : ''

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

      const propsData = { class: 'v-list-group__prepend-icon' }

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

    onMounted(() => {
      if (listGroups) listGroups.register(listGroup)
      if (subgroups) subgroups.register(listGroup)
      if (isNotActive.value) isActive.value = true
    })

    onBeforeUnmount(() => {
      listGroups.unregister(listGroup)
    })

    return () => {
      const items = slots.default && VExpandTransition(genItems())
      const header = slots.title && genGroupHeader()

      const propsData = {
        class: classes.value,
        ref: refGroup,
      }

      const children = [header, items]

      return h(
        'div',
        props.color ? setTextColor(props.color, propsData) : propsData,
        children
      )
    }
  },
})
