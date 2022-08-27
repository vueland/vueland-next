import { Plugin, Ref } from 'vue'
import { UserOptions } from './params'
import { Maybe } from './base'

export interface Library {
  install: Plugin['install']
  icons: Maybe<UserOptions['icons']>
  theme: Ref<Maybe<UserOptions['theme']>>

  setTheme(theme: UserOptions['theme']): void

  setIcons(icons: UserOptions['icons']): void
}

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
