import { Ref } from 'vue'

export type ListItem = {
  itemRef: Ref<Maybe<HTMLElement>>
  isActive: Ref<boolean>
}

export type List = {
  add: (item: ListItem) => void
  remove: (item: ListItem) => void
  click: (item: ListItem) => void
  activeClass: string
}
