import { Props } from '../types';
interface Overlayable {
    createOverlay: () => void;
    removeOverlay: () => void;
}
export declare function overlayProps(): Props;
export declare function useOverlay(props: Props, overlayOn?: Element): Overlayable;
export {};
