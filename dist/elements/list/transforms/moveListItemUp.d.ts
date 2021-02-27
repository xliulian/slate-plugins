import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
export interface MoveListItemUpOptions {
    list: NodeEntry<Ancestor>;
    listItem: NodeEntry<Ancestor>;
}
/**
 * Move a list item next to its parent.
 * The parent should be a list item.
 */
export declare const moveListItemUp: (editor: Editor, { list, listItem }: MoveListItemUpOptions, options?: ListOptions | undefined) => true | undefined;
//# sourceMappingURL=moveListItemUp.d.ts.map