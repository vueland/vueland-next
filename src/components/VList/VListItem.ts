// Styles
import './VListItem.scss'

// Vue API
import {
  h,
  ref,
  inject,
  computed,
  watch,
  defineComponent,
  onMounted,
  onBeforeUnmount
} from 'vue'

// Effects
import { useToggle } from '../../effects/use-toggle'
import { useGroup } from '../../effects/use-group'
import { useSelectMultiple } from '../../effects/use-select-multiple'

// Types
import { RefGroup } from '../../../types'

export const VListItem = defineComponent({
  name: 'v-list-item',

  props: {
    activeClass: {
      type: String,
      default: ''
    },
    dark: Boolean,
    inactive: Boolean,
    active: Boolean,
    link: Boolean,
    value: {
      type: [Object, String, Number, Boolean],
      default: null
    }
  },

  emits: ['click'],

  setup(props, { slots, emit }) {
    const { isActive } = useToggle(props)
    const { injectGroup } = useGroup()
    const { select } = useSelectMultiple()

    const listType: any = inject('list-type')
    const itemsGroup = listType.isInGroup && injectGroup('items-group')

    const itemRef = ref<HTMLElement | null>(null)

    const item: RefGroup = {
      ref: itemRef,
      active: isActive
    }

    watch(
      () => props.active,
      (to) => (isActive.value = to),
      { immediate: true }
    )

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list-item': true,
      'v-list-item--active': isActive.value,
      'v-list-item--link': props.link,
      [props.activeClass]: isActive.value && !!props.activeClass
    }))

    function onClick() {
      !listType.isInGroup && (isActive.value = !isActive.value)
      props.link && (isActive.value = !isActive.value)
      !props.link && listType.isInGroup && select(item.ref, itemsGroup.group.value)
      emit('click')
    }

    onMounted(() => {
      if (
        itemsGroup?.options?.parent.value ===
        (itemRef.value as any).parentNode.parentNode
      ) {
        !props.link && itemsGroup.register(item)
      }
    })

    onBeforeUnmount(() => itemsGroup?.unregister(item))

    return () => {
      const content = slots.default && slots.default({ active: isActive.value })

      const propsData = {
        class: classes.value,
        ref: itemRef,
        onClick
      }

      return h('div', propsData, content)
    }
  }
})
