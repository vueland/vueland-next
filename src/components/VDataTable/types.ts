export interface IDataTableHeaderOptions {
  color?: string
  contentColor?: string
}

export interface IFooterPaginationOptions {
  buttonsColor?: string,
  displayColor?: string
}

export interface IDataTableFooterOptions {
  pagination?: IFooterPaginationOptions,
  color?: string
  contentColor?: string,
  rowsPerPageOptions?: Array<number>
  rowsPerPageText?: string
}
