import { VNode } from 'vue';
export declare function createVTransition(hooks: Record<string, any>, mode?: string): (vNode: VNode) => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
