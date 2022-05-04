import { VNode } from 'vue';
export declare function transitionProps(): {
    transition: StringConstructor;
};
export declare function useTransition(vNode: VNode, transition: string, mode?: string): VNode;
