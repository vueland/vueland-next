import { ComponentPublicInstance, Ref } from 'vue'

export type UserOptions = {
  icons: 'material-icons' | 'fa'
  theme: ThemeOptions
}

export interface ThemeOptions {
  primary?: string
  secondary?: string
  accent?: string
  error?: string
  success?: string
  warning?: string
  base?: string
  content?: string
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

export type TableFilterParams = {
  value: any
  col: DataTableCol
}

export interface DataTableCol {
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
  filter?: (arg: TableFilterParams) => any
  sort?: (a: any, b: any) => number
  onSort?: (col: DataTableCol) => any
  onFilter?: (params: TableFilterParams) => any
}

export interface DataTableColProps {
  sorted?: boolean
  filtered?: boolean
}

export interface DataRowProps {
  selected: boolean
}

type PaginationHandlerArgument = {
  page: number
  count: number
}

type PaginationOptions = {
  buttonsColor?: string
  displayColor?: string
  onNext?: (PaginationHandlerArgument) => any
  onPrev?: (PaginationHandlerArgument) => any
  disableIf?: boolean
}

export interface FooterOptions {
  pagination?: PaginationOptions
  counts?: string
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
