import { Editor } from 'slate';
import { EditorAboveOptions } from '../types/Editor.types';
/**
 * Get the range from the start of the block above a location (default: selection) to the location.
 */
export declare const getRangeFromBlockStart: (editor: Editor, options?: Omit<EditorAboveOptions, 'match'>) => {
    anchor: import("slate").Point;
    focus: import("slate").Point;
} | undefined;
//# sourceMappingURL=getRangeFromBlockStart.d.ts.map