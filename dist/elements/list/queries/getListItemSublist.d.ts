import { Ancestor, NodeEntry } from 'slate';
import { ListOptions } from '../types';
/**
 * Get the list inside listItem if existing.
 * It assumes this structure: ul>li>p+ul
 */
export declare const getListItemSublist: (listItem: NodeEntry<Ancestor>, options?: ListOptions | undefined) => NodeEntry<Ancestor> | undefined;
//# sourceMappingURL=getListItemSublist.d.ts.map