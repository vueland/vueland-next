import { ComponentPublicInstance } from "vue";

export type Props = {
  [key: string]: any;
};

export type OffsetSizes = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type DatePickerBtnHandlers = {
  onNext?: () => any;
  onPrev?: () => any;
};

export type DatePickerDate = {
  year: number;
  month: number;
  date: number | null;
  day: number;
  isHoliday?: boolean;
};

export type DateParams = {
  dd: number;
  mm: number;
  yyyy: number;
  MM: string;
};

export type Column = {
  key: string;
  title: string;
  width?: string | number;
  resizeable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  sorted?: boolean;
  filtered?: boolean;
  align?: string;
  useOnCreate?: boolean;
  useOnEdit?: boolean;
  show?: boolean;
  format?: (...arg: any) => any;
};

export type TableFilter = {
  value: string | number;
  col: Column;
};

export type TableCol<T> = T extends keyof Column ? T : any;

export type ListGroup = {
  ref: ComponentPublicInstance<HTMLInputElement>;
  active: boolean;
};
