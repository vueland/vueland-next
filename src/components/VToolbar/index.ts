import { VToolbar } from './VToolbar'
import { VToolbarNavBtn } from './VToolbarNavBtn'
import { createSimpleFunctional } from '../../helpers'

const VToolbarItems = createSimpleFunctional('v-toolbar__items')
const VToolbarLogo = createSimpleFunctional('v-toolbar__logo')
const VToolbarContent = createSimpleFunctional('v-toolbar__content')

export {
  VToolbar,
  VToolbarLogo,
  VToolbarItems,
  VToolbarNavBtn,
  VToolbarContent
}
