import { ComputedRef } from 'vue';
declare type Elevetable = {
    elevationClasses: ComputedRef<Record<string, boolean>>;
};
export declare function elevationProps(): {
    elevation: (StringConstructor | NumberConstructor)[];
};
export declare function useElevation(props: any): Elevetable;
export {};
