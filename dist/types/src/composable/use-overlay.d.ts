interface Overlayable {
    createOverlay: () => void;
    removeOverlay: () => void;
}
export declare function overlayProps(): {
    overlay: BooleanConstructor;
    overlayColor: {
        type: StringConstructor;
        default: string;
    };
};
export declare function useOverlay(props: any, overlayOn?: Element): Overlayable;
export {};
