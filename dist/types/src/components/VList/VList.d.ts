export declare const VList: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: (NumberConstructor | ArrayConstructor)[];
        default: null;
    };
    multiple: BooleanConstructor;
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeClass: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:value"[], "update:value", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: (NumberConstructor | ArrayConstructor)[];
        default: null;
    };
    multiple: BooleanConstructor;
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeClass: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}, {
    value: number | unknown[];
    color: string;
    multiple: boolean;
    active: boolean;
    textColor: string;
    activeClass: string;
}>;
