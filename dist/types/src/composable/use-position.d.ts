import { ComputedRef } from 'vue';
declare type Positionable = {
    positionClasses: ComputedRef<Record<string, boolean>>;
};
export declare const positionProps: () => {
    absolute: BooleanConstructor;
    left: BooleanConstructor;
    right: BooleanConstructor;
    top: BooleanConstructor;
    bottom: BooleanConstructor;
};
export declare const usePosition: (props: any) => Positionable;
export {};
