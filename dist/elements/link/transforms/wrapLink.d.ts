import { Editor } from 'slate';
import { LinkOptions } from '../types';
/**
 * Wrap selected nodes with a link and collapse at the end.
 */
export declare const wrapLink: (editor: Editor, url: string, options?: ({
    at?: import("slate").Path | import("slate").Point | import("slate").Range | undefined;
} & LinkOptions) | undefined) => void;
//# sourceMappingURL=wrapLink.d.ts.map