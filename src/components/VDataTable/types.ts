export interface IDataTableHeaderOptions {
  color?: string
  contentColor?: string,
  resizerColor?: string
}

export interface IFooterPaginationOptions {
  buttonsColor?: string,
  displayColor?: string
}

export interface IFooterCountsOptions {
  rowsPerPageOptions?: Array<number>
  rowsPerPageText?: string
  displayColor?: string
}

export interface IDataTableFooterOptions {
  pagination?: IFooterPaginationOptions
  counts: IFooterCountsOptions
  color?: string
  contentColor?: string
}
