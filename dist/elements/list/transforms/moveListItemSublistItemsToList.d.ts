import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
export interface MergeListItemIntoListOptions {
    /**
     * List items of the sublist of this node will be moved.
     */
    fromListItem: NodeEntry<Ancestor>;
    /**
     * List items will be moved in this list.
     */
    toList: NodeEntry<Ancestor>;
    /**
     * Move to the start of the list instead of the end.
     */
    start?: boolean;
}
/**
 * Move the list items of the sublist of `fromListItem` to `toList`.
 */
export declare const moveListItemSublistItemsToList: (editor: Editor, { fromListItem, toList, start }: MergeListItemIntoListOptions, options?: ListOptions | undefined) => number;
//# sourceMappingURL=moveListItemSublistItemsToList.d.ts.map