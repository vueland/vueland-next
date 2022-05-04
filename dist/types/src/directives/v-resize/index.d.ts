import { DirectiveBinding } from 'vue';
interface ResizeVNodeDirective extends DirectiveBinding {
    value: () => void;
    options: boolean | AddEventListenerOptions;
}
export declare const resize: {
    mounted(el: HTMLElement & any, binding: ResizeVNodeDirective): void;
    beforeUnmount(el: any): void;
};
export {};
