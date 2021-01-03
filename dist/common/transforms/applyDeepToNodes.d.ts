import { Node } from 'slate';
import { QueryOptions } from '../types/QueryOptions.types';
export interface ApplyDeepToNodesOptions {
    node: Node;
    source: Record<string, any> | (() => Record<string, any>);
    apply: (node: Node, source: Record<string, any> | (() => Record<string, any>)) => void;
    query?: QueryOptions;
}
/**
 * Recursively apply an operation to children nodes with a query.
 */
export declare const applyDeepToNodes: ({ node, source, apply, query, }: ApplyDeepToNodesOptions) => void;
//# sourceMappingURL=applyDeepToNodes.d.ts.map