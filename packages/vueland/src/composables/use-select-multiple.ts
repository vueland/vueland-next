import { Ref } from 'vue'
import { ListItem, ListItemRef } from '../types'

export function useSelect() {

  const select = (items: Ref<ListItem[]>, item: ListItemRef) => {
    items.value.forEach(it => {
      if (!it.active) it.active = item.ref.value === it.ref
      else it.active = false
    })
  }

  return {
    select
  }
}
