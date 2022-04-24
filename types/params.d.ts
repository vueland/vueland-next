import { ComponentPublicInstance, Ref } from 'vue'

export type UserOptions = {
  icons: 'material-icons' | 'fa'
  theme: {
    dark?: boolean
    themes?: {
      light?: ThemeOptions
      dark?: ThemeOptions
    }
  }
}

export declare interface ThemeOptions {
  base?: string
  primary?: string
  secondary?: string
  accent?: string
  error?: string
  info?: string
  success?: string
  warning?: string
}

export interface Dimensions {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
}

export interface OffsetSizes {
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
  default?: boolean
}

export type DateParams = {
  dd: number
  mm: number
  yyyy: number
  MM: string
  D: string
}

export interface DataColumn {
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

export interface DataColumnProps {
  sorted: boolean
  filtered: boolean
}

export interface DataRowProps {
  selected: boolean
}

export type TableFilter = {
  value: string | number
  col: DataColumn
}

type PaginationOptions = {
  buttonsColor?: string
  displayColor?: string
}

export interface FooterOptions {
  pagination?: PaginationOptions
  rowsPerPageOptions?: number[]
  rowsCountText?: string
  color?: string
  dark?: boolean
}

export interface HeaderOptions {
  contentColor?: string
  color?: string
  dark?: boolean
}

export interface ListItem {
  ref: HTMLElement | ComponentPublicInstance | null
  active: boolean
}

export interface ListItemRef {
  ref: Ref<ListItem['ref']>
  active: Ref<ListItem['active']>
}

export interface ColorSetters {
  setBackground: (color: string, data: any) => object
  setTextColor: (color: string, data: any) => object
}

export interface GroupManager {
  injectGroup: (groupName: string) => InjectedGroup | null
  provideGroup: (groupName: string, options?: any, group?: any) => void
  options?: any
}

export interface InjectedGroup {
  register: (group: ListItemRef) => void
  unregister: (group: ListItemRef) => void
  group: Ref<any[]>
  options?: any
}

export interface ListTypes {
  isInGroup: boolean
  isInList: boolean
}

export type Nullable<T> = T | null
