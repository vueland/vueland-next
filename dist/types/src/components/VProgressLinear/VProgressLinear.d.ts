export declare const VProgressLinear: import("vue").DefineComponent<{
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    bufferValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
    backgroundOpacity: {
        type: StringConstructor;
        default: string;
    };
    indeterminate: BooleanConstructor;
    reverse: BooleanConstructor;
    rounded: BooleanConstructor;
    stream: BooleanConstructor;
    striped: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    bufferValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
    backgroundOpacity: {
        type: StringConstructor;
        default: string;
    };
    indeterminate: BooleanConstructor;
    reverse: BooleanConstructor;
    rounded: BooleanConstructor;
    stream: BooleanConstructor;
    striped: BooleanConstructor;
}>>, {
    value: string | number;
    reverse: boolean;
    color: string;
    backgroundColor: string;
    height: string | number;
    indeterminate: boolean;
    rounded: boolean;
    modelValue: string | number;
    bufferValue: string | number;
    backgroundOpacity: string;
    stream: boolean;
    striped: boolean;
}>;
