import { Editor, Location } from 'slate';
import { ListOptions } from '../types';
/**
 * If at (default = selection) is in ul>li>p, return li and ul node entries.
 */
export declare const getListItemEntry: (editor: Editor, { at }?: {
    at?: import("slate").Path | import("slate").Point | import("slate").Range | null | undefined;
}, options?: ListOptions | undefined) => {
    list: import("slate").NodeEntry<import("slate").Ancestor>;
    listItem: import("slate").NodeEntry<import("slate").Ancestor>;
} | undefined;
//# sourceMappingURL=getListItemEntry.d.ts.map