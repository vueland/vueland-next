import { VNode } from 'vue';
import { DatePickerDate } from '../../../types';
export declare function genTableRows(vNodesArray: VNode[], rowClassName: string, cellsInRow: number): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[];
export declare function toDateString(date: any): Date;
export declare function parseDate(selectedDate: Date | string): DatePickerDate;
