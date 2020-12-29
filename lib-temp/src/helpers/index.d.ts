export declare function createSimpleFunctional(c: string, el?: string, name?: string): import("vue").DefineComponent<{}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}>;
export declare function addOnceListener(el: EventTarget, eventName: string, cb: (event: Event) => void, options?: boolean | AddEventListenerOptions): void;
export declare function convertToUnit(str: string | number | null | undefined, unit?: string): string | undefined;
export declare function warning(warningText: any): void;
