import { Plugin } from 'vue'
import { UserOptions } from './params'

export interface Library {
  theme: any
  icons: string
  install: Plugin['install']

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
