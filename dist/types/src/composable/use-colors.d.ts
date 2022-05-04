export declare const colorProps: (defaultColor?: string) => {
    color: {
        type: StringConstructor;
        default: string;
    };
};
export declare const useColors: () => {
    setTextCssColor: (color: string) => Record<string, string>;
    setTextClassNameColor: (color: string) => {};
    setBackgroundCssColor: (color: string) => {};
    setBackgroundClassNameColor: (color: string) => {};
};
