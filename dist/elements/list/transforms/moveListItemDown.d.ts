import { Ancestor, Editor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
export interface MoveListItemDownOptions {
    list: NodeEntry<Ancestor>;
    listItem: NodeEntry<Ancestor>;
}
export declare const moveListItemDown: (editor: Editor, { list, listItem }: MoveListItemDownOptions, options?: ListOptions | undefined) => void;
//# sourceMappingURL=moveListItemDown.d.ts.map