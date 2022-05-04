import { VNode } from 'vue';
export declare const VNavigation: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    fixed: BooleanConstructor;
    right: BooleanConstructor;
    left: BooleanConstructor;
    onHover: BooleanConstructor;
    miniVariant: BooleanConstructor;
    expand: BooleanConstructor;
    offsetTop: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    miniVariantWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    maxVariantWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:expand"[], "update:expand", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    fixed: BooleanConstructor;
    right: BooleanConstructor;
    left: BooleanConstructor;
    onHover: BooleanConstructor;
    miniVariant: BooleanConstructor;
    expand: BooleanConstructor;
    offsetTop: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    miniVariantWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    maxVariantWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
}>> & {
    "onUpdate:expand"?: ((...args: any[]) => any) | undefined;
}, {
    left: boolean;
    right: boolean;
    fixed: boolean;
    color: string;
    expand: boolean;
    offsetTop: string | number;
    onHover: boolean;
    miniVariant: boolean;
    miniVariantWidth: string | number;
    maxVariantWidth: string | number;
}>;
