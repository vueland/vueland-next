import { VNode } from 'vue';
export declare const VInput: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    rules: {
        type: import("vue").PropType<((val: any) => boolean)[]>;
        default: null;
    };
    value: (ObjectConstructor | DateConstructor | StringConstructor | NumberConstructor)[];
    label: {
        type: StringConstructor;
        default: string;
    };
    prependIcon: {
        type: StringConstructor;
        default: string;
    };
    appendIcon: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    focused: BooleanConstructor;
    readonly: BooleanConstructor;
    file: BooleanConstructor;
    hints: {
        type: BooleanConstructor;
        default: boolean;
    };
    hintMessage: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    rules: {
        type: import("vue").PropType<((val: any) => boolean)[]>;
        default: null;
    };
    value: (ObjectConstructor | DateConstructor | StringConstructor | NumberConstructor)[];
    label: {
        type: StringConstructor;
        default: string;
    };
    prependIcon: {
        type: StringConstructor;
        default: string;
    };
    appendIcon: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    focused: BooleanConstructor;
    readonly: BooleanConstructor;
    file: BooleanConstructor;
    hints: {
        type: BooleanConstructor;
        default: boolean;
    };
    hintMessage: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    readonly: boolean;
    color: string;
    disabled: boolean;
    focused: boolean;
    prependIcon: string;
    appendIcon: string;
    file: boolean;
    hints: boolean;
    hintMessage: string;
    textColor: string;
    rules: ((val: any) => boolean)[];
}>;
