import { PropType } from 'vue';
declare type Colorable = {
    setBackground: (color: string, data: any) => object;
    setTextColor: (color: string, data: any) => object;
};
interface ColorProps {
    color: PropType<string>;
}
export declare function colorProps(): ColorProps;
export declare const useColors: () => Colorable;
export {};
