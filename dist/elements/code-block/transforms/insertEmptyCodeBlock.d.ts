import { Editor } from 'slate';
import { InsertNodesOptions } from '../../../common';
import { CodeBlockInsertOptions, CodeBlockOptions, CodeLineOptions } from '../types';
/**
 * Called by toolbars to make sure a code-block gets inserted below a paragraph
 * rather than awkwardly splitting the current selection.
 */
export declare const insertEmptyCodeBlock: (editor: Editor, options?: Omit<InsertNodesOptions, 'match'>, pluginsOptions?: CodeBlockInsertOptions & CodeBlockOptions & CodeLineOptions) => void;
//# sourceMappingURL=insertEmptyCodeBlock.d.ts.map