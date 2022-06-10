import { Editor, Location } from 'slate';
import { TableOptions } from '../types';
/**
 * If at (default = selection) is in table>tr>td, return table, tr, and td
 * node entries.
 */
export declare const getTableCellEntry: (editor: Editor, { at }?: {
    at?: import("slate").Path | import("slate").Point | import("slate").Range | null | undefined;
}, options?: TableOptions | undefined) => {
    tableElement: import("slate").NodeEntry<import("slate").Ancestor> | undefined;
    tableRow: import("slate").NodeEntry<import("slate").Ancestor>;
    tableCell: import("slate").NodeEntry<import("slate").Ancestor>;
} | undefined;
//# sourceMappingURL=getTableCellEntry.d.ts.map