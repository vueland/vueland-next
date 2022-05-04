export declare const VSkeleton: import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    radius: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    light: {
        type: BooleanConstructor;
        default: boolean;
    };
    dynamic: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    radius: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    light: {
        type: BooleanConstructor;
        default: boolean;
    };
    dynamic: BooleanConstructor;
}>>, {
    tag: string;
    light: boolean;
    height: string | number;
    width: string | number;
    radius: string | number;
    dynamic: boolean;
}>;
