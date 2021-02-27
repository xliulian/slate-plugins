import { Ancestor, Editor } from 'slate';
import { EditorAboveOptions } from '../types/Editor.types';
/**
 * Get node above a location (default: selection).
 */
export declare const getAbove: <T = Ancestor>(editor: Editor, options?: EditorAboveOptions<T>) => import("slate").NodeEntry<Ancestor> | undefined;
//# sourceMappingURL=getAbove.d.ts.map