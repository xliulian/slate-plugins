import { Editor, Node, NodeEntry } from 'slate';
import { ListNormalizerOptions, ListOptions } from '../types';
/**
 * If the list item has no child: insert an empty paragraph.
 * Else: move the children that are not valid to the paragraph.
 */
export declare const normalizeListItem: (editor: Editor, { nodeEntry, validLiChildrenTypes, }: {
    nodeEntry: NodeEntry<Node>;
} & ListNormalizerOptions, options?: ListOptions | undefined) => boolean;
//# sourceMappingURL=normalizeListItem.d.ts.map