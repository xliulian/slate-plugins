import { Node } from 'slate';
import { QueryNodeOptions } from '../types/QueryNodeOptions';
export interface ApplyDeepToNodesOptions {
    node: Node;
    source: Record<string, any> | (() => Record<string, any>);
    apply: (node: Node, source: Record<string, any> | (() => Record<string, any>)) => void;
    query?: QueryNodeOptions;
}
/**
 * Recursively apply an operation to children nodes with a query.
 */
export declare const applyDeepToNodes: ({ node, source, apply, query, }: ApplyDeepToNodesOptions) => void;
//# sourceMappingURL=applyDeepToNodes.d.ts.map