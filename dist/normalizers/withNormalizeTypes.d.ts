import { Editor, Path } from 'slate';
import { ErrorHandler } from '../common/types/ErrorHandler.types';
interface Rule {
    /**
     * Force the type of the node at the given path
     */
    strictType?: string;
    /**
     * Type of the inserted node at the given path if `strictType` is not provided
     */
    type?: string;
    /**
     * Path where the rule applies
     */
    path: Path;
}
export interface WithNormalizeTypes extends ErrorHandler {
    /**
     * Set of rules for the types.
     * For each rule, provide a `path` and either `strictType` or `type`.
     * If there is no node existing at `path`:
     * insert a node with `strictType`.
     * If there is a node existing at `path` but its type is not `strictType` or `type`:
     * set the node type to `strictType` or `type`.
     */
    rules: Rule[];
}
export declare const withNormalizeTypes: ({ rules, onError }: WithNormalizeTypes) => <T extends Editor>(editor: T) => T;
export {};
//# sourceMappingURL=withNormalizeTypes.d.ts.map