import { VNode } from 'vue';
import { Maybe } from '../../../types/base';
export declare const VMenu: import("vue").DefineComponent<{
    activator: {
        type: (ObjectConstructor | StringConstructor)[];
        default: null;
    };
    internalActivator: BooleanConstructor;
    positionX: {
        type: NumberConstructor;
        default: number;
    };
    positionY: {
        type: NumberConstructor;
        default: number;
    };
    absolute: BooleanConstructor;
    left: BooleanConstructor;
    right: BooleanConstructor;
    top: BooleanConstructor;
    bottom: BooleanConstructor;
    maxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    zIndex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    openOnHover: BooleanConstructor;
    openOnClick: BooleanConstructor;
    openOnContextmenu: BooleanConstructor;
    closeOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    offsetX: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    offsetY: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: BooleanConstructor;
    inputActivator: {
        type: StringConstructor;
        default: string;
    };
}, () => (Maybe<VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>> | undefined)[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("hide" | "show")[], "hide" | "show", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    activator: {
        type: (ObjectConstructor | StringConstructor)[];
        default: null;
    };
    internalActivator: BooleanConstructor;
    positionX: {
        type: NumberConstructor;
        default: number;
    };
    positionY: {
        type: NumberConstructor;
        default: number;
    };
    absolute: BooleanConstructor;
    left: BooleanConstructor;
    right: BooleanConstructor;
    top: BooleanConstructor;
    bottom: BooleanConstructor;
    maxHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    zIndex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    openOnHover: BooleanConstructor;
    openOnClick: BooleanConstructor;
    openOnContextmenu: BooleanConstructor;
    closeOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    elevation: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    offsetX: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    offsetY: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    modelValue: BooleanConstructor;
    inputActivator: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onHide?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
}, {
    left: boolean;
    right: boolean;
    bottom: boolean;
    top: boolean;
    absolute: boolean;
    maxHeight: string | number;
    width: string | number;
    zIndex: string | number;
    elevation: string | number;
    modelValue: boolean;
    activator: string | Record<string, any>;
    openOnHover: boolean;
    openOnClick: boolean;
    openOnContextmenu: boolean;
    closeOnClick: boolean;
    offsetX: string | number;
    offsetY: string | number;
    inputActivator: string;
    internalActivator: boolean;
    positionX: number;
    positionY: number;
}>;
