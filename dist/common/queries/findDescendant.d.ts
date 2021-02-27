/**
 * Iterate through all of the nodes in the editor and return the first match. If
 * no match is found, return undefined.
 */
import { Editor, Node, NodeEntry } from 'slate';
import { FindNodeOptions } from './findNode';
/**
 * Get the first descendant node matching the condition.
 */
export declare const findDescendant: <T extends Node = Node>(editor: Editor, options: FindNodeOptions<T>) => NodeEntry<T> | undefined;
//# sourceMappingURL=findDescendant.d.ts.map