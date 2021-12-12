import { Ancestor, Editor, Location, NodeEntry } from 'slate';
import { EditorParentOptions } from '../types/Editor.types';
/**
 * See {@link Editor.parent}.
 * Returns undefined if there is no parent.
 */
export declare const getParent: (editor: Editor, at: Location, options?: EditorParentOptions | undefined) => NodeEntry<Ancestor> | undefined;
//# sourceMappingURL=getParent.d.ts.map