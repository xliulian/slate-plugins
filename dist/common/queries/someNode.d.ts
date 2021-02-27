import { Editor, Node } from 'slate';
import { FindNodeOptions } from './findNode';
/**
 * Iterate through all of the nodes in the editor and break early for the first truthy match. Otherwise
 * returns false.
 */
export declare const someNode: <T extends Node = Node>(editor: Editor, options: FindNodeOptions<T>) => boolean;
//# sourceMappingURL=someNode.d.ts.map