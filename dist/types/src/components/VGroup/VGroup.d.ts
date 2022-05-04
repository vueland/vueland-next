import { VNode } from 'vue';
export declare const VGroup: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    expand: BooleanConstructor;
    subgroup: BooleanConstructor;
    title: {
        type: StringConstructor;
        default: string;
    };
    activeClass: {
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
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    expand: BooleanConstructor;
    subgroup: BooleanConstructor;
    title: {
        type: StringConstructor;
        default: string;
    };
    activeClass: {
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
}>>, {
    color: string;
    title: string;
    prependIcon: string;
    appendIcon: string;
    activeClass: string;
    expand: boolean;
    subgroup: boolean;
}>;
