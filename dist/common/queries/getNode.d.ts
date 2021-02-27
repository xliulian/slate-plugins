import { Editor, Path } from 'slate';
/**
 * Get the descendant node referred to by a specific path.
 * If the path is an empty array, it refers to the root node itself.
 * If the node is not found, return null.
 */
export declare const getNode: (editor: Editor, path: Path) => import("slate").Element | import("slate").Text | null;
//# sourceMappingURL=getNode.d.ts.map