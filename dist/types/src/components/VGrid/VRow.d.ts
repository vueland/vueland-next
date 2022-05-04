import { VNode } from 'vue';
export declare const VRow: import("vue").DefineComponent<{
    align: {
        type: StringConstructor;
        default: null;
        validator: (str: string) => boolean;
    };
    alignContent: {
        type: StringConstructor;
        default: null;
        validator: (str: string) => boolean;
    };
    justify: {
        type: StringConstructor;
        default: null;
        validator: (str: string) => boolean;
    };
    noGutter: BooleanConstructor;
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    align: {
        type: StringConstructor;
        default: null;
        validator: (str: string) => boolean;
    };
    alignContent: {
        type: StringConstructor;
        default: null;
        validator: (str: string) => boolean;
    };
    justify: {
        type: StringConstructor;
        default: null;
        validator: (str: string) => boolean;
    };
    noGutter: BooleanConstructor;
}>>, {
    justify: string;
    alignContent: string;
    align: string;
    noGutter: boolean;
}>;
