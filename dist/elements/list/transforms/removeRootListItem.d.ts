import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
export interface RemoveListItemOptions {
    list: NodeEntry<Ancestor>;
    listItem: NodeEntry<Ancestor>;
}
/**
 * Remove list item and move its sublist to list if any.
 * TODO: handle expanded selection
 * TODO: move p children in the previous list item if any
 */
export declare const removeRootListItem: (editor: Editor, { list, listItem }: RemoveListItemOptions, options?: ListOptions | undefined) => boolean;
//# sourceMappingURL=removeRootListItem.d.ts.map