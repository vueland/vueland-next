export declare const useInputStates: (props: any, { attrs, emit }: {
    attrs: any;
    emit: any;
}) => {
    state: {
        focused: boolean;
    };
    isReadonly: import("vue").ComputedRef<boolean>;
    isDisabled: import("vue").ComputedRef<boolean>;
    onFocus: (e: any) => void;
    onBlur: (e: any) => void;
    onChange: () => void;
    onSelect: (val: any) => void;
};
