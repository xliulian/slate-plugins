import { Editor, Location } from 'slate';
import { CodeLineOptions } from '../types';
/**
 * If at (default = selection) is in ul>li>p, return li and ul node entries.
 */
export declare const getCodeLineEntry: (editor: Editor, { at }?: {
    at?: import("slate").Path | import("slate").Point | import("slate").Range | null | undefined;
}, options?: CodeLineOptions | undefined) => {
    codeBlock: import("slate").NodeEntry<import("slate").Ancestor>;
    codeLine: import("slate").NodeEntry<import("slate").Ancestor>;
} | undefined;
//# sourceMappingURL=getCodeLineEntry.d.ts.map