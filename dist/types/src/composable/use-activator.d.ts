import { ActivatorListeners, Dimensions } from '../../types/composables';
import { Maybe } from '../../types/base';
export declare function activatorProps(): {
    activator: {
        type: (ObjectConstructor | StringConstructor)[];
        default: null;
    };
    internalActivator: BooleanConstructor;
};
export declare const useActivator: (props: any) => {
    activatorRef: any;
    getActivator: (e?: Event | undefined) => Maybe<HTMLElement>;
    getActivatorSizes: () => Partial<Dimensions>;
    addActivatorEvents: () => void;
    removeActivatorEvents: () => void;
    genActivatorListeners: (props: any, handlers: any) => Partial<ActivatorListeners>;
};
