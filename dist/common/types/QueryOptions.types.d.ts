import { Node, NodeEntry } from 'slate';
export interface QueryOptions {
    filter?: (entry: NodeEntry<Node>) => boolean;
    allow?: string[];
    exclude?: string[];
}
//# sourceMappingURL=QueryOptions.types.d.ts.map