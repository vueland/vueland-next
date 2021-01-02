export type Props = {
  [key: string]: any
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
  isHoliday?: boolean
}

export type Column = {
  title: string,
  width?: string | number
  resizeable?: boolean
  sortable?: boolean
  filterable?: boolean
  align?: string
}

export type TableCol<T> = T extends keyof Column ? T : any
