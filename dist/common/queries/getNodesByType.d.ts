import { Editor } from 'slate';
import { EditorNodesOptions } from '../types/Editor.types';
/**
 * Get the nodes with a type included in `types` at a location (default: selection).
 */
export declare const getNodesByType: (editor: Editor, types: string[] | string, options?: Omit<EditorNodesOptions, 'match'>) => Generator<import("slate").NodeEntry<import("slate").Node>, void, undefined>;
//# sourceMappingURL=getNodesByType.d.ts.map