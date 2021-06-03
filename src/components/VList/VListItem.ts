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

// Types
import { ListItemRef, ListTypes } from '../../../types'

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

    const handlers: any = inject('list-handlers')
    const listTypes = inject('list-types') as ListTypes
    const listItems = inject('list-items') as any
    const groupItems = listTypes.isInGroup && inject('group-items') as any

    const itemRef = ref<HTMLElement | null>(null)

    const item: ListItemRef = {
      ref: itemRef,
      active: isActive
    }

    listTypes.isInList = !listTypes.isInGroup

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
      if (!listTypes.isInGroup || props.link) {
        isActive.value = !isActive.value
      }

      if (!props.link && listTypes.isInGroup) {
        handlers.itemClick(groupItems.items, item)
      }

      if (!props.link && listTypes.isInList) {
        handlers.itemClick(listItems.items, item)
      }

      emit('click')
    }

    onMounted(() => {
      if (
        groupItems && (groupItems as any).parent.value ===
        (itemRef.value as any).parentNode.parentNode
      ) {
        !props.link && groupItems?.items.value.push(item)
      }

      if (listTypes.isInList && listItems) listItems.register(item)
    })

    onBeforeUnmount(() => groupItems && groupItems.unregister(item))

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
