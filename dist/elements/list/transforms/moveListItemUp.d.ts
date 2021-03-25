import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
export interface MoveListItemUpOptions {
    list: NodeEntry<Ancestor>;
    listItem: NodeEntry<Ancestor>;
}
/**
 * Move a list item up.
 */
export declare const moveListItemUp: (editor: Editor, { list, listItem }: MoveListItemUpOptions, options?: ListOptions | undefined) => boolean;
//# sourceMappingURL=moveListItemUp.d.ts.map