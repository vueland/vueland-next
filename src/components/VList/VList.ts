// Vue API
import { h, ref, provide, defineComponent } from 'vue'

// Effects
import { useSelect } from '../../effects/use-select-multiple'

// Types
import { ListItem, ListItemRef } from '../../../types'
import { Ref } from 'vue'

export const VList = defineComponent({
  name: 'v-list',
  props: {
    multiple: Boolean,
  },

  setup(props, { slots }) {
    const { select } = useSelect()

    const listsGroup = ref([])
    const listItems = ref([])

    provide('lists-group', {
      items: listsGroup,
      register: register.bind(null, listsGroup),
      unregister: unregister.bind(null, listsGroup),
    })

    provide('list-items', {
      items: listItems,
      register: register.bind(null, listItems),
      unregister: unregister.bind(null, listItems),
    })

    provide('list-handlers', {
      listClick,
      itemClick,
    })

    provide('list-types', {
      isInGroup: false,
      isInList: false,
      isInMenu: false,
    })

    function register(items: Ref<ListItem[]>, item: ListItem) {
      items.value.push(item)
    }

    function unregister(items: Ref<ListItem[]>, item: ListItem) {
      items.value.filter((it) => it.ref !== item.ref)
    }

    function listClick(groups: Ref<ListItem[]>, item: ListItemRef) {
      if (groups.value.length) {
        groups.value.forEach((it: ListItem) => {
          if (it.ref === item.ref.value) {
            it.active = !it.active
          }
        })
      }
    }

    function itemClick(items: Ref<ListItem[]>, item: ListItemRef) {
      !props.multiple && select(items, item)
      props.multiple && (item.active.value = !item.active.value)
    }

    return () => {
      const propsData = {
        class: {
          'v-list': true,
        },
      }

      return h('div', propsData, slots.default && slots.default())
    }
  },
})
