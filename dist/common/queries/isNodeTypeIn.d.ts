import { Editor } from 'slate';
import { EditorNodesOptions } from '../types/Editor.types';
/**
 * Is there a node with a type included in `types` at a location (default: selection).
 */
export declare const isNodeTypeIn: (editor: Editor, types: string[] | string, options?: Omit<EditorNodesOptions, 'match'>) => boolean;
//# sourceMappingURL=isNodeTypeIn.d.ts.map