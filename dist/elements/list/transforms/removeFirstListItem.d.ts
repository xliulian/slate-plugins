import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
/**
 * If the list is not nested and
 * if the list has one child and
 * if there is a sublist in `listItem` and
 * if `listItem` is the first child of `list`
 */
export declare const removeFirstListItem: (editor: Editor, { list, listItem, }: {
    list: NodeEntry<Ancestor>;
    listItem: NodeEntry<Ancestor>;
}, options?: ListOptions | undefined) => boolean;
//# sourceMappingURL=removeFirstListItem.d.ts.map