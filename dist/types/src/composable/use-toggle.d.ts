import { Ref } from 'vue';
declare type Toggleable = {
    isActive: Ref<boolean>;
};
export declare function useToggle(props: any, propName?: string): Toggleable;
export {};
