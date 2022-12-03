import { defineComponent, h, ref, computed, VNode } from 'vue'
// Composables
import { useColors, colorProps } from '../../composables/use-colors'
// Helpers
import { convertToUnit } from '../../helpers'

export default defineComponent({
  name: 'v-navigation',
  props: {
    fixed: Boolean,
    right: Boolean,
    left: Boolean,
    onHover: Boolean,
    miniVariant: Boolean,
    expand: Boolean,
    offsetTop: {
      type: [String, Number],
      default: 0,
    },
    miniVariantWidth: {
      type: [String, Number],
      default: 56,
    },
    maxVariantWidth: {
      type: [String, Number],
      default: 237,
    },
    ...colorProps(),
  },
  emits: ['update:expand'],

  setup(props, { slots, emit }): () => VNode {
    const { setBackgroundClassNameColor, setBackgroundCssColor } = useColors()
    const isHovered = ref<boolean>(false)

    const isExpanded = computed(() => {
      if (props.onHover && isHovered.value) {
        return true
      }

      if (props.expand) {
        return true
      }

      if (!props.expand && props.miniVariant) {
        return false
      }

      if (!props.expand && !props.miniVariant) {
        return false
      }

      return !props.miniVariant
    })

    const computedWidth = computed<number | string>(() => {
      if (!isExpanded.value) return props.miniVariantWidth
      return props.maxVariantWidth
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-navigation': true,
      'v-navigation--expanded': isExpanded.value,
      'v-navigation--fixed': props.fixed,
      'v-navigation--base': !props.color,
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
    }))

    const styles = computed<Record<string, string>>(() => ({
      width: convertToUnit(computedWidth.value),
      maxHeight: `calc(100vh - ${ convertToUnit(props.offsetTop) })`,
      top: props.fixed ? convertToUnit(props.offsetTop) : '',
      left: !props.right && props.fixed ? convertToUnit(0) : '',
      right: props.right && props.fixed ? convertToUnit(0) : '',
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    const genNavigationContent = (): VNode => {
      return h('div', {
        class: 'v-navigation__content',
      }, {
        default: () => slots.default?.(),
      })
    }

    const onMouseenter = () => {
      if (!props.onHover || props.miniVariant) {
        return
      }

      isHovered.value = true
      emit('update:expand', true)
    }

    const onMouseleave = () => {
      if (!props.onHover || props.miniVariant) {
        return
      }

      isHovered.value = false
      emit('update:expand', false)
    }

    return () => h('aside', {
      class: classes.value,
      style: styles.value,
      onMouseenter,
      onMouseleave,
    }, genNavigationContent())
  },
})
