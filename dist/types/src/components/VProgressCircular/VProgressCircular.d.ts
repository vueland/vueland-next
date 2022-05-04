import { VNode } from 'vue';
export declare const VProgressCircular: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    indeterminate: BooleanConstructor;
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rotate: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    indeterminate: BooleanConstructor;
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rotate: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>>, {
    value: string | number;
    color: string;
    size: string | number;
    rotate: string | number;
    width: string | number;
    indeterminate: boolean;
}>;
