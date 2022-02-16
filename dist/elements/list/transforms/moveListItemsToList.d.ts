import { Ancestor, Editor, NodeEntry, Path } from 'slate';
import { MoveChildrenOptions } from '../../../common/transforms/moveChildren';
import { ListOptions } from '../types';
export interface MergeListItemIntoListOptions {
    /**
     * List items of the sublist of this node will be moved.
     */
    fromListItem?: NodeEntry<Ancestor>;
    /**
     * List items of the list will be moved.
     */
    fromList?: NodeEntry<Ancestor>;
    /**
     * List items will be moved in this list.
     */
    toList?: NodeEntry<Ancestor>;
    fromStartIndex?: MoveChildrenOptions['fromStartIndex'];
    /**
     * List position where to move the list items.
     */
    toListIndex?: number | null;
    to?: Path;
    /**
     * Delete `fromListItem` sublist if true.
     * @default true
     */
    deleteFromList?: boolean;
}
/**
 * Move the list items of the sublist of `fromListItem` to `toList` (if `fromListItem` is defined).
 * Move the list items of `fromList` to `toList` (if `fromList` is defined).
 */
export declare const moveListItemsToList: (editor: Editor, { fromList, fromListItem, fromStartIndex, to: _to, toList, toListIndex, deleteFromList, }: MergeListItemIntoListOptions, options?: ListOptions | undefined) => number | undefined;
//# sourceMappingURL=moveListItemsToList.d.ts.map