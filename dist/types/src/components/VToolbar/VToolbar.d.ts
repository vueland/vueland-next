import { VNode } from 'vue';
export declare const VToolbar: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    fixed: BooleanConstructor;
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    fixed: BooleanConstructor;
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>>, {
    fixed: boolean;
    color: string;
    height: string | number;
}>;
