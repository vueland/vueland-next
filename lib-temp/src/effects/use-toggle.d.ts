import { Props } from '../types';
import { Ref } from 'vue';
declare type Toggleable = {
    isActive: Ref<boolean>;
};
export declare function useToggle(props: Props, propName?: string): Toggleable;
export {};
