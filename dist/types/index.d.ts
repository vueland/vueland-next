import { App } from 'vue'
import { ListItemRef, ListItem, UserOptions } from './params'

export default class Vueland {
  constructor(presets?: Partial<UserOptions>)

  static install: (app: App, options?: UserOptions) => void
  static installed: boolean
  static options: UserOptions
}

export { Vueland }

export {
  UserOptions,
  ThemeOptions,
  DataColumn,
  DataColumnProps,
  FooterOptions,
  HeaderOptions,
  TableFilter,
  Dimensions,
  OffsetSizes,
  ColorSetters,
  ListItem,
  ListItemRef,
  InjectedGroup,
  GroupManager,
  DatePickerBtnHandlers,
  DatePickerDate,
  ListTypes,
} from './params'
