import { Editor, Node, NodeEntry } from 'slate';
import { QueryOptions } from '../types/QueryOptions.types';
/**
 * Find the block before a block by id.
 * If not found, find the first block by id and return [null, its previous path]
 */
export declare const getPreviousBlockById: (editor: Editor, id: string, query?: QueryOptions | undefined) => NodeEntry<Node> | undefined;
//# sourceMappingURL=getPreviousBlockById.d.ts.map