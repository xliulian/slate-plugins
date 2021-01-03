import { Editor, NodeEntry, Path } from 'slate';
export interface MoveChildrenOptions {
    /**
     * Parent node of the children to move.
     */
    at: NodeEntry | Path;
    /**
     * Path where to move the children.
     */
    to: Path;
    /**
     * Start index of the children to move.
     * Example: 1 means children[0] will not be moved.
     */
    start?: number;
    /**
     * Condition for the child to be moved
     */
    match?(entry: NodeEntry): boolean;
}
/**
 * Move the children of a node to a path.
 * Returns the number of children moved.
 */
export declare const moveChildren: (editor: Editor, { at, to, match, start }: MoveChildrenOptions) => number;
//# sourceMappingURL=moveChildren.d.ts.map