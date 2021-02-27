import { Editor, Range } from 'slate';
import { EditorAboveOptions } from '../types/Editor.types';
/**
 * Is the range (default: selection) across blocks.
 */
export declare const isRangeAcrossBlocks: (editor: Editor, { at, ...options }?: Pick<EditorAboveOptions<import("slate").Ancestor>, "mode" | "voids" | "block"> & {
    at?: Range | null | undefined;
}) => boolean | undefined;
//# sourceMappingURL=isRangeAcrossBlocks.d.ts.map