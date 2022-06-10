import { Ancestor, Editor } from 'slate';
import { EditorAboveOptions } from '../types/Editor.types';
/**
 * Get the block above a location (default: selection).
 */
export declare const getBlockAbove: <T = Ancestor>(editor: Editor, options?: EditorAboveOptions<T>) => import("slate").NodeEntry<Ancestor> | undefined;
//# sourceMappingURL=getBlockAbove.d.ts.map