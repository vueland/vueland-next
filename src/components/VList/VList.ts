// Styles
import './VList.scss'

// Vue API
import { h, ref, provide, defineComponent } from 'vue'

// Effects
import { useSelectMultiple } from '../../effects/use-select-multiple'

// Types
import { ListItem, ListItemRef } from '../../../types'
import { Ref } from 'vue'

export const VList = defineComponent({
  name: 'v-list',

  setup(_, { slots }) {
    const { select } = useSelectMultiple()

    const listsGroup = ref([])
    const listItems = ref([])

    provide('lists-group', {
      items: listsGroup,
      register: register.bind(null, listsGroup),
      unregister: unregister.bind(null, listsGroup)
    })

    provide('list-items', {
      items: listItems,
      register: register.bind(null, listItems),
      unregister: unregister.bind(null, listItems),
    })

    provide('list-handlers', {
      listClick,
      itemClick
    })

    provide('list-types', {
      isInGroup: false,
      isInList: false
    })

    function register(items: Ref<ListItem[]>, item: ListItem) {
      items.value.push(item)
    }

    function unregister(items: Ref<ListItem[]>, item: ListItem) {
      items.value.filter((it) => {
        return it.ref !== item.ref
      })
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
      select(items, item)
    }

    return () => {
      const dataProps = {
        class: {
          'v-list': true
        }
      }

      return h('div', dataProps, slots.default && slots.default())
    }
  }
})
