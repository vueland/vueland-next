import { createSimpleFunctional } from '../../helpers'
import { VList } from './VList'
import { VListItem } from './VListItem'

const VListItemTitle = createSimpleFunctional('v-list-item__title')
const VListItemSubtitle = createSimpleFunctional('v-list-item__subtitle')
const VListItemContent = createSimpleFunctional('v-list-item__content')
const VListItemIcon = createSimpleFunctional('v-list-item__icon')

export {
  VList,
  VListItem,
  VListItemTitle,
  VListItemContent,
  VListItemSubtitle,
  VListItemIcon,
}
