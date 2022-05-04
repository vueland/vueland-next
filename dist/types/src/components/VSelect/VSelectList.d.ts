export declare const VSelectList: import("vue").DefineComponent<{
    items: {
        type: ArrayConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    valueKey: {
        type: StringConstructor;
        default: string;
    };
    selected: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        default: null;
    };
    activeClass: {
        type: StringConstructor;
        default: string;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "select"[], "select", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    valueKey: {
        type: StringConstructor;
        default: string;
    };
    selected: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        default: null;
    };
    activeClass: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    selected: string | number | Record<string, any>;
    textColor: string;
    activeClass: string;
    items: unknown[];
    valueKey: string;
}>;
