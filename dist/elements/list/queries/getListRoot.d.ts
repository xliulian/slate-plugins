import { Ancestor, Editor, NodeEntry, Path, Point, Range } from 'slate';
import { ListOptions } from '../types';
/**
 * Searches upward for the root list element
 */
export declare const getListRoot: (editor: Editor, at?: Path | Range | Point | null, options?: ListOptions | undefined) => NodeEntry<Ancestor> | undefined;
//# sourceMappingURL=getListRoot.d.ts.map