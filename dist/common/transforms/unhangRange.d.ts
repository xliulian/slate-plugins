import { Editor, Path, Point, Range, Span } from 'slate';
export interface UnhangRangeOptions {
    at?: Range | Path | Point | Span;
    voids?: boolean;
    unhang?: boolean;
}
/**
 * Return {@link Editor.unhangRange} if `unhang` is true and if `at` (default: selection) is a range.
 */
export declare const unhangRange: (editor: Editor, options?: UnhangRangeOptions) => void;
//# sourceMappingURL=unhangRange.d.ts.map