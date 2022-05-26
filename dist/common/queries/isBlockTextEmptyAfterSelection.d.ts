import { Editor } from 'slate';
/**
 * Is there empty text after the selection.
 * If there is no leaf after the selected leaf, return {@link Editor.isEnd}.
 * Else, check if the next leaves are empty.
 */
export declare const isBlockTextEmptyAfterSelection: (editor: Editor) => boolean;
//# sourceMappingURL=isBlockTextEmptyAfterSelection.d.ts.map