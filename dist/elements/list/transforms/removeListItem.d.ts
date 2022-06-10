import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
export interface RemoveListItemOptions {
    list: NodeEntry<Ancestor>;
    listItem: NodeEntry<Ancestor>;
}
/**
 * Remove list item and move its sublist to list if any.
 */
export declare const removeListItem: (editor: Editor, { list, listItem }: RemoveListItemOptions, options?: ListOptions | undefined) => boolean | undefined;
//# sourceMappingURL=removeListItem.d.ts.map