import { ComputedRef } from 'vue';
import { Props } from '../types';
declare type Elevetable = {
    elevationClasses: ComputedRef<Record<string, boolean>>;
};
export declare function elevationProps(): Props;
export declare function useElevation(props: Props): Elevetable;
export {};
