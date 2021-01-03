import { Editor } from 'slate';
import { EditorAboveOptions } from '../types/Editor.types';
/**
 * Get the block above a location (default: selection) by type.
 */
export declare const getAboveByType: (editor: Editor, types: string[] | string, options?: Omit<EditorAboveOptions, 'match'>) => import("slate").NodeEntry<import("slate").Ancestor> | undefined;
//# sourceMappingURL=getAboveByType.d.ts.map