import { Editor, Location, Node, NodeEntry, Span } from 'slate';
import { MatchOptions } from '../types/Editor.types';
export declare type FindNodeOptions<T extends Node = Node> = {
    at?: Location | Span;
    reverse?: boolean;
    voids?: boolean;
} & MatchOptions<T>;
/**
 * Find node matching the condition.
 */
export declare const findNode: <T extends Node = Node>(editor: Editor, options: FindNodeOptions<T>) => NodeEntry<T> | undefined;
//# sourceMappingURL=findNode.d.ts.map