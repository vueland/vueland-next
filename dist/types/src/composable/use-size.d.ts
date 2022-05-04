export declare const sizeProps: (defaultSize?: string) => {
    sm: {
        type: BooleanConstructor;
        default: boolean;
    };
    md: {
        type: BooleanConstructor;
        default: boolean;
    };
    lg: {
        type: BooleanConstructor;
        default: boolean;
    };
    xl: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const useSize: (props: any) => {
    size: import("vue").ComputedRef<string>;
};
