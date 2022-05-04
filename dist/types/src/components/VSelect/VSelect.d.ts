import { VNode } from 'vue';
export declare const VSelect: import("vue").DefineComponent<{
    modelValue: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        default: null;
    };
    items: {
        type: ArrayConstructor;
        default: null;
    };
    valueKey: {
        type: StringConstructor;
        default: string;
    };
    activeClass: {
        type: StringConstructor;
        default: string;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "blur" | "change" | "focus" | "select" | "update:modelValue")[], "select" | "click" | "blur" | "change" | "focus" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        default: null;
    };
    items: {
        type: ArrayConstructor;
        default: null;
    };
    valueKey: {
        type: StringConstructor;
        default: string;
    };
    activeClass: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string | number | Record<string, any>;
    activeClass: string;
    items: unknown[];
    valueKey: string;
}>;
