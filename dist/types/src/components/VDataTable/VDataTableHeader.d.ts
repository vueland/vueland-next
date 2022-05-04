import { VNode } from 'vue';
export declare const VDataTableHeader: import("vue").DefineComponent<any, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("filter" | "select-all" | "sort" | "update:cols")[], "filter" | "sort" | "select-all" | "update:cols", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<any> & {
    onFilter?: ((...args: any[]) => any) | undefined;
    "onSelect-all"?: ((...args: any[]) => any) | undefined;
    onSort?: ((...args: any[]) => any) | undefined;
    "onUpdate:cols"?: ((...args: any[]) => any) | undefined;
}, {} | {
    [x: string]: any;
}>;
