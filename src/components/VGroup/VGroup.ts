import { defineComponent, h, withDirectives, ref, watch, computed, vShow, VNode } from 'vue'
import { ExpandTransition } from '../transitions'

import { VIcon } from '../VIcon'

import { useColors, colorProps } from '../../composable/use-colors'
import { useIcons } from '../../composable/use-icons'

export const VGroup = defineComponent({
  name: 'v-group',
  props: {
    expand: Boolean,
    subgroup: Boolean,
    title: {
      type: String,
      default: '',
    },
    activeClass: {
      type: String,
      default: 'main--text text--evo',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '',
    },
    ...colorProps(),
  },
  setup(props, { slots }): () => VNode {
    const { icons } = useIcons()
    const { setBackgroundCssColor, setBackgroundClassNameColor } = useColors()

    const isActive = ref<boolean>(false)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-group': true,
      'v-group--subgroup': props.subgroup,
      'v-group--active': isActive.value,
      'v-group--default': !isActive.value,
      [props.activeClass]: !!props.activeClass && isActive.value,
      ...setBackgroundClassNameColor(props.color),
    }))

    const styles = computed(() => ({
      ...setBackgroundCssColor(props.color),
    }))

    const genHeaderContent = () => {
      const content: any = props.title || slots.header?.()

      return h('div', {
        class: 'v-group__header-content',
      }, content)
    }

    const genExpandIcon = (icon: VNode): VNode => {
      return h('div', {
        class: 'v-group__expand-icon',
      }, icon)
    }

    const genSubExpandIcon = (icon: VNode): VNode => {
      return h('div', {
        class: 'v-group__sub-expand-icon',
      }, icon)
    }

    const genPrependIcon = (icon: VNode): VNode => {
      return h('div', {
        class: 'v-group__prepend-icon',
      }, icon)
    }

    const genAppendIcon = (icon: VNode): VNode => {
      return h('div', {
        class: 'v-group__append-icon',
      }, icon)
    }

    const genIcon = (iconName: string): VNode => {
      return h(VIcon, {
        icon: iconName,
        size: 16,
      })
    }

    const genGroupHeader = (): VNode => {
      return h('div', {
          class: 'v-group__header',
          onClick: () => isActive.value = !isActive.value,
        },
        [
          props.subgroup && genSubExpandIcon(genIcon(icons.$caretDown)),
          props.prependIcon && genPrependIcon(genIcon(props.prependIcon)),
          genHeaderContent(),
          props.appendIcon && genAppendIcon(genIcon(props.appendIcon)),
          !props.subgroup && genExpandIcon(genIcon(icons.$chevronDown)),
        ],
      )
    }

    const genGroupChildContent = (): VNode => {
      return withDirectives(h('div', {
        class: 'v-group__content',
      }, {
        default: () => slots.default?.(),
      }), [[vShow, isActive.value]])
    }

    watch(() => props.expand, to => isActive.value = to, { immediate: true })

    return () => h('div', {
      class: classes.value,
      style: styles.value,
    }, [
      genGroupHeader(),
      ExpandTransition(genGroupChildContent()),
    ])
  },
})
