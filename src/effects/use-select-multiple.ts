import { Ref } from 'vue'
import { ListItem, ListItemRef } from '../../types'

export function useSelect() {

  const select = (items: Ref<ListItem[]>, item: ListItemRef) => {
    items.value.forEach(it => {
      it.active = item.ref.value === it.ref
    })
  }

  return {
    select
  }
}
