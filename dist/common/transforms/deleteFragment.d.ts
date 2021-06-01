/// <reference types="jest" />
import { Editor, Location, Path, Point, Range } from 'slate';
export declare const deleteFragment: (editor: Editor, options?: {
    at?: Path | Point | Range | undefined;
    distance?: number | undefined;
    unit?: "character" | "word" | "line" | "block" | undefined;
    reverse?: boolean | undefined;
    hanging?: boolean | undefined;
    voids?: boolean | undefined;
    test?: any;
    moveNode?: ((editor: Editor, options: {
        at: Path;
        to: Path;
    }) => void) | undefined;
    removeEmptyAncestor?: ((editor: Editor, options: {
        at: Path;
    }) => void) | undefined;
}) => void;
//# sourceMappingURL=deleteFragment.d.ts.map