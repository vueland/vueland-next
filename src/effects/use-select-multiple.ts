import { Ref } from 'vue'
import { ListItem, ListItemRef } from '../../types'

export function useSelect() {

  const select = (items: Ref<ListItem[]>, item: ListItemRef) => {
    items.value.forEach(it => {
      if ((item.ref.value === it.ref) && it.active) {
        it.active = false
        return
      }
      it.active = item.ref.value === it.ref
    })
  }

  return {
    select
  }
}
