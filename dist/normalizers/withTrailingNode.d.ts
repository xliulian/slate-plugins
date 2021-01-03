import { Editor } from 'slate';
import { QueryOptions } from '../common';
export interface WithTrailingNode extends QueryOptions {
    /**
     * Type of the trailing block
     */
    type?: string;
    /**
     * Level where the trailing node should be, the first level being 0.
     */
    level?: number;
}
/**
 * Add a trailing block when the last node type is not `type`
 */
export declare const withTrailingNode: ({ type, level, ...query }?: WithTrailingNode) => <T extends Editor>(editor: T) => T;
//# sourceMappingURL=withTrailingNode.d.ts.map