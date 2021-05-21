import { UserOptions } from './params'
import { App } from 'vue'

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
  ListGroup,
  DatePickerBtnHandlers,
  DatePickerDate,
} from './params'
