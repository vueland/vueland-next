import { Ref } from 'vue';
import { ListItem, ListItemRef } from '../../types';
export declare function useSelect(): {
    select: (items: Ref<ListItem[]>, item: ListItemRef) => void;
};
