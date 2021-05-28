import { Group, RefGroup } from '../../types'

export function useSelectMultiple() {
  const select = (item: RefGroup['ref'], items: Group[]) => {
    items.forEach(it => {
      if (item.value === it.ref && it.active) {
        it.active = false
        return
      }
      it.active = item.value === it.ref
    })
  }

  const multiple = () => {
    console.log('multiple')
  }

  return {
    select,
    multiple
  }
}
