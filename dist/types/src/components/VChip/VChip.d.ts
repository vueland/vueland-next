export declare const VChip: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    disabled: boolean;
    title: string;
    textColor: string;
    closable: boolean;
}>;
