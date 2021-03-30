import { Ancestor, Descendant, NodeEntry, Path } from 'slate';
/**
 * Get the last child of a node or null if no children.
 */
export declare const getLastChild: (nodeEntry: NodeEntry<Ancestor>) => NodeEntry<Descendant> | null;
/**
 * Get last child path. If there is no child, last index is 0.
 */
export declare const getLastChildPath: (nodeEntry: NodeEntry<Ancestor>) => Path;
/**
 * Is the child path the last one of the parent.
 */
export declare const isLastChild: (parentEntry: NodeEntry<Ancestor>, childPath: Path) => boolean;
//# sourceMappingURL=getLastChild.d.ts.map