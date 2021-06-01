import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
/**
 * If list is not nested and if li is not the first child, move li up.
 */
export declare const removeFirstListItem: (editor: Editor, { list, listItem, }: {
    list: NodeEntry<Ancestor>;
    listItem: NodeEntry<Ancestor>;
}, options?: ListOptions | undefined) => boolean;
//# sourceMappingURL=removeFirstListItem.d.ts.map