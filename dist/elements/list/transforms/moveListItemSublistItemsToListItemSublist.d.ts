import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
export interface MoveListItemSublistItemsToListItemSublistOptions {
    /**
     * The list item to merge.
     */
    fromListItem: NodeEntry<Ancestor>;
    /**
     * The list item where to merge.
     */
    toListItem: NodeEntry<Ancestor>;
    /**
     * Move to the start of the list instead of the end.
     */
    start?: boolean;
}
/**
 * Move fromListItem sublist list items to the end of `toListItem` sublist.
 * If there is no `toListItem` sublist, insert one.
 */
export declare const moveListItemSublistItemsToListItemSublist: (editor: Editor, { fromListItem, toListItem, start, }: MoveListItemSublistItemsToListItemSublistOptions, options?: ListOptions | undefined) => number;
//# sourceMappingURL=moveListItemSublistItemsToListItemSublist.d.ts.map