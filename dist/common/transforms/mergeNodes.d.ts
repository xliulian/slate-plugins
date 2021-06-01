import { Editor, Location, Node, Path, Range } from 'slate';
/**
 * Merge a node at a location with the previous node of the same depth,
 * removing any empty containing nodes after the merge if necessary.
 */
export declare const mergeNodes: (editor: Editor, options?: {
    at?: Path | import("slate").Point | Range | undefined;
    match?: ((n: Node) => boolean) | undefined;
    mode?: "highest" | "lowest" | undefined;
    hanging?: boolean | undefined;
    voids?: boolean | undefined;
    /**
     * Default: if the node isn't already the next sibling of the previous node, move
     * it so that it is before merging.
     */
    mergeNode?: ((editor: Editor, options: {
        at: Path;
        to: Path;
    }) => void) | undefined;
    /**
     * Default: if there was going to be an empty ancestor of the node that was merged,
     * we remove it from the tree.
     */
    removeEmptyAncestor?: ((editor: Editor, options: {
        at: Path;
    }) => void) | undefined;
}) => void;
//# sourceMappingURL=mergeNodes.d.ts.map