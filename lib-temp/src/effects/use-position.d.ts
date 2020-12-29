import { Props } from '../types';
import { ComputedRef } from 'vue';
declare type Positionable = {
    positionClasses: ComputedRef<Record<string, boolean>>;
};
export declare const positionProps: () => Props;
export declare const usePosition: (props: Props) => Positionable;
export {};
