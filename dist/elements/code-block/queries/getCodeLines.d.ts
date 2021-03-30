import { Editor, Location } from 'slate';
import { CodeLineOptions } from '../types';
/**
 * If at (default = selection) is in ul>li>p, return li and ul node entries.
 */
export declare const getCodeLines: (editor: Editor, { at }?: {
    at?: import("slate").Path | import("slate").Point | import("slate").Range | null | undefined;
}, options?: CodeLineOptions | undefined) => import("slate").NodeEntry<import("slate").Node>[] | undefined;
//# sourceMappingURL=getCodeLines.d.ts.map