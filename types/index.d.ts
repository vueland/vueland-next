import { Plugin } from 'vue'
import { UserOptions } from './params'
import { App } from 'vue'

export default class Vueland {
  constructor(presets?: Partial<UserOptions>)

  install: Plugin
  userOptions: UserOptions

  static install: (app: App, options?: UserOptions) => void
  static installed: boolean
  static options: UserOptions
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
  ListGroup,
  DatePickerBtnHandlers,
  DatePickerDate,
} from './params'

// declare module 'vueland/lib/effects' {
//   export const useAutoPosition: (props: any) => any
//   export const useActivator: () => any
//   export const useColors: () => any
// }
