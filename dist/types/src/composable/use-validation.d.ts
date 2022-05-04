import { PropType } from 'vue';
import { Maybe } from '../../types/base';
export declare const validationProps: () => {
    rules: {
        type: PropType<((val: any) => boolean)[]>;
        default: null;
    };
    value: (ObjectConstructor | DateConstructor | StringConstructor | NumberConstructor)[];
};
export declare const useValidation: (props: any) => {
    errorState: {
        innerError: Maybe<object>;
        innerErrorMessage: Maybe<string>;
        isDirty: boolean;
    };
    computedColor: import("vue").ComputedRef<Maybe<string>>;
    validationClasses: () => {
        'e-validatable': boolean;
    };
    validate: (val?: any) => boolean | void;
    dirty: () => boolean;
};
