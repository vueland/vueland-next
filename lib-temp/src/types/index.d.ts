export declare type Props = {
    [key: string]: any;
};
export declare type OffsetSizes = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare type DatePickerBtnHandlers = {
    onNext?: () => any;
    onPrev?: () => any;
};
export declare type DatePickerDate = {
    year: number;
    month: number;
    date: number | null;
    day: number;
    isHoliday?: boolean;
};
