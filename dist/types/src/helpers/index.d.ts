import { Slots } from 'vue';
export declare const createSimpleFunctional: (c: string, el?: string, name?: string) => import("vue").DefineComponent<{}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export declare const addOnceListener: (el: EventTarget, eventName: string, cb: (event: Event) => void, options?: boolean | AddEventListenerOptions) => void;
export declare const convertToUnit: (str: string | number, unit?: string) => string;
export declare const warning: (warningText: any) => void;
export declare const copyWithoutLink: (obj: any) => any;
export declare const addScopedSlot: (slotName: string, slots: Slots) => (scoped: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined;
export declare const getKeyValueFromTarget: <T>(valueKey: string, target: T) => string;
export declare const mapToValArray: (map: any) => any[];
export declare const getStringKeysValue: (str: string, value: any) => any;
export declare const toCamelCase: (...args: string[]) => string;
