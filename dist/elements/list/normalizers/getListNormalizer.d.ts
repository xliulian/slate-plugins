import { Editor, NodeEntry } from 'slate';
import { ListNormalizerOptions, ListOptions } from '../types';
/**
 * Normalize list node to force the ul>li>p+ul structure.
 */
export declare const getListNormalizer: (editor: Editor, { validLiChildrenTypes }: ListNormalizerOptions, options?: ListOptions | undefined) => ([node, path]: NodeEntry<import("slate").Node>) => void;
//# sourceMappingURL=getListNormalizer.d.ts.map