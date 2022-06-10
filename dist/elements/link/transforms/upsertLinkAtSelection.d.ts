import { Editor } from 'slate';
import { LinkOptions } from '../types';
/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */
export declare const upsertLinkAtSelection: (editor: Editor, url: string, options?: ({
    /**
     * If true, wrap the link at the location (default: selection) even if the selection is collapsed.
     */
    wrap?: boolean | undefined;
} & LinkOptions) | undefined) => void;
//# sourceMappingURL=upsertLinkAtSelection.d.ts.map