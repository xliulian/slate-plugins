import { SlatePlugin } from '@udecode/slate-plugins-core';
import { ReactEditor } from 'slate-react';
import { SlateDocumentFragment } from '../../common/types/SlateDocument.types';
export interface WithDeserializeHTMLOptions {
    plugins?: SlatePlugin[];
    /**
     * Function called before inserting the deserialized html.
     * Default: if the block above is empty and the first fragment node type is not inline,
     * set the selected node type to the first fragment node type.
     */
    preInsert?: (fragment: SlateDocumentFragment) => SlateDocumentFragment;
    /**
     * Function called to insert the deserialized html.
     * Default: {@link Transforms.insertFragment}.
     */
    insert?: (fragment: SlateDocumentFragment) => void;
}
/**
 * Enables support for deserializing inserted content from HTML format to Slate format.
 */
export declare const withDeserializeHTML: ({ plugins, ...options }?: WithDeserializeHTMLOptions) => <T extends ReactEditor>(editor: T) => T;
//# sourceMappingURL=withDeserializeHTML.d.ts.map