import { VNode } from 'vue';
export declare const VCol: import("vue").DefineComponent<{
    order: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    cols: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    offset: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    order: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    cols: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    offset: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
}>>, {
    order: string | number;
    offset: string | number;
    cols: string | number;
}>;
