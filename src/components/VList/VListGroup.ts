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
import { useGroup } from '../../effects/use-group'
import { colorProps, useColors } from '../../effects/use-colors'
import { elevationProps, useElevation } from '../../effects/use-elevation'

// Components
import { VIcon } from '../VIcon'
import { VListItem } from './VListItem'
import { VListItemIcon } from './index'
import { VExpandTransition } from '../transitions'

// Types
import { VNode, ComponentPublicInstance, Ref } from 'vue'
import { RefGroup } from '../../../types'

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
    dark: Boolean,
    multiple: Boolean,
    group: String,
    disabled: Boolean,
    noAction: Boolean,
    expanded: Boolean,
    subGroup: Boolean,
    value: Boolean,
    modelValue: Boolean,
    ...elevationProps(),
    ...colorProps(),
  } as any,

  setup(props, { slots }) {
    const { elevationClasses } = useElevation(props)
    const { icons, iconSize } = useIcons('md')
    const { setTextColor } = useColors()
    const { injectGroup } = useGroup()

    const refGroup: Ref<HTMLElement | ComponentPublicInstance | null> = ref(
      null
    )
    const isActive = ref<boolean>(false)

    const groups = injectGroup('lists-group')
    // const itemsGroup = injectGroup('items-group')

    const listGroup = genListGroupParams()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-group': true,
      'v-list-group__sub-group': props.subGroup,
      'v-list-group--active': isActive.value && !props.noAction,
      'v-list-group--expanded': isActive.value,
      'v-list-group--no-action': props.noAction,
      'v-list-group--light': !props.dark,
      'v-list-group--dark': props.dark,
      [props.activeClass]: isActive.value,
      ...elevationClasses.value,
    }))

    function onClick() {
      if (props.disabled || props.noAction) return

      groups?.options.listClick(listGroup)
    }

    function genListGroupParams(): RefGroup {
      return {
        ref: refGroup,
        active: isActive,
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

      const propsAppendIcon = !props.subGroup ? icons.$expand : props.appendIcon

      if ((!propsAppendIcon && !slotAppendIcon) || props.noAction) return null

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
          'v-list-group__header': true,
        },
        link: true,
        dark: props.dark,
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
      groups?.register(listGroup)
      if (props.expanded || props.noAction) isActive.value = true
    })

    onBeforeUnmount(() => {
      if (groups) {
        groups.unregister(listGroup)
      }
    })

    return () => {
      const items = slots.default && VExpandTransition(genItems())
      const header = slots.title && genGroupHeader()

      const propsData = {
        class: classes.value,
        ref: refGroup,
      }

      const children = [header, items]

      const color =
        props.dark && !isActive.value
          ? 'white'
          : !props.dark && !isActive.value
          ? ''
          : props.color

      return h(
        'div',
        color ? setTextColor(color, propsData) : propsData,
        children
      )
    }
  },
})
