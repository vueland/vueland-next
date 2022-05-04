export declare const VFileInput: import("vue").DefineComponent<{
    disabled: BooleanConstructor;
    multiple: BooleanConstructor;
    chipColor: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: ArrayConstructor;
        default: null;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: BooleanConstructor;
    multiple: BooleanConstructor;
    chipColor: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: ArrayConstructor;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    multiple: boolean;
    disabled: boolean;
    modelValue: unknown[];
    chipColor: string;
}>;
