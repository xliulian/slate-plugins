import { Editor, Node, NodeEntry } from 'slate';
import { QueryNodeOptions } from '../types/QueryNodeOptions';
/**
 * Find the block before a block by id.
 * If not found, find the first block by id and return [null, its previous path]
 */
export declare const getPreviousBlockById: (editor: Editor, id: string, query?: QueryNodeOptions | undefined) => NodeEntry<Node> | undefined;
//# sourceMappingURL=getPreviousBlockById.d.ts.map