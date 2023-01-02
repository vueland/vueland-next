import { Plugin, Ref } from 'vue'
import { UserOptions } from './params'

export interface Library {
  install: Plugin['install']
  icons: Maybe<UserOptions['icons']>
  theme: Ref<Maybe<UserOptions['theme']>>

  setTheme(theme: UserOptions['theme']): void

  setIcons(icons: UserOptions['icons']): void
}

export type Vueland = Library & Plugin

declare module 'vueland' {
  export const createVueland: (args: any) => Vueland
}

export {
  UserOptions,
  ThemeOptions,
  TableColumn,
  TableColumnProps,
  FooterOptions,
  HeaderOptions,
  TableFilterParams,
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
