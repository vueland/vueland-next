export declare const validateProps: () => {
    rules: {
        type: ArrayConstructor;
        default: null;
    };
    value: (StringConstructor | NumberConstructor | DateConstructor)[];
};
export declare function useValidate(props: any): {
    validate: (val?: any) => boolean | void;
    dirty: () => void;
    update: (err: any, msg?: null) => null;
    validateClasses: import("vue").ComputedRef<Record<string, boolean>>;
    computedColor: import("vue").ComputedRef<string | undefined>;
    validationState: import("vue").ComputedRef<string | undefined>;
    errorState: {
        innerError: null;
        innerErrorMessage: null;
        isDirty: boolean;
    };
};
