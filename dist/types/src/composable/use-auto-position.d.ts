export declare function autoPositionProps(): {
    positionX: {
        type: NumberConstructor;
        default: number;
    };
    positionY: {
        type: NumberConstructor;
        default: number;
    };
};
export declare function useAutoPosition(props: any): {
    dimensions: {
        activator: {
            top: number;
            left: number;
            bottom: number;
            right: number;
            width: number;
            height: number;
        };
        content: {
            top: number;
            left: number;
            bottom: number;
            right: number;
            width: number;
            height: number;
        };
        pageYOffset: number;
        pageWidth: number;
    };
    contentRef: import("vue").Ref<HTMLElement | null>;
    setDimensions: (activatorEl: HTMLElement) => Promise<void>;
    updateDimensions: () => Promise<void>;
};
