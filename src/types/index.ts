import { ComponentPublicInstance } from 'vue'

export type UserOptions = {
  icons?: 'material-icons'
  theme?: {
    dark?: boolean
    themes?: {
      light?: ThemeOptions
      dark?: ThemeOptions
    }
  }
}

export declare type ThemeOptions = {
  base?: string
  primary: string
  secondary?: string
  accent?: string
  error?: string
  info?: string
  success?: string
  warning?: string
}

export type OffsetSizes = {
  left: number
  top: number
  width: number
  height: number
}

export type DatePickerBtnHandlers = {
  onNext?: () => any
  onPrev?: () => any
}

export type DatePickerDate = {
  year: number
  month: number
  date: number | null
  day: number
  mls: number
  isHoliday?: boolean
}

export type DateParams = {
  dd: number
  mm: number
  yyyy: number
  MM: string
}

export type Column = {
  key: string
  title: string
  width?: string | number
  resizeable?: boolean
  filterable?: boolean
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  cellClass?: string
  rowCellClass?: string
  show?: boolean
  format?: (row: any) => any
  filter?: (arg: TableFilter) => any
  sort?: (a: any, b: any) => number
}

export type TableFilter = {
  value: string | number
  col: Column
}

type PaginationOptions = {
  buttonsColor?: string
  displayColor?: string
}

export type FooterOptions = {
  pagination?: PaginationOptions
  rowsPerPageOptions?: number[]
  rowsCountText?: string
  color?: string
  dark?: boolean
}

export type HeaderOptions = {
  contentColor?: string
  color?: string
  dark?: boolean
}

export type ListGroup = {
  ref: ComponentPublicInstance<HTMLInputElement>
  active: boolean
}
