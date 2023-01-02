import { Ref } from 'vue'

export interface IDataTableHeaderOptions {
  color?: string
  contentColor?: string,
  resizerColor?: string
}

interface IPaginationOptions {
  buttonsColor?: string
  displayColor?: string
  onNext?: (PaginationHandlerArgument) => any
  onPrev?: (PaginationHandlerArgument) => any
  disableIf?: boolean
  page?: Ref<number>
}

export interface IFooterCountsOptions {
  rowsPerPageOptions?: Array<number>
  rowsPerPageText?: string
  totalRows?: number
  displayColor?: string
}

export interface IDataTableFooterOptions {
  pagination?: IPaginationOptions
  counts?: IFooterCountsOptions
  color?: string
  contentColor?: string
}
