import { Editor } from 'slate';
import { InsertNodesOptions } from '../../../common/types/Transforms.types';
import { CodeBlockOptions, CodeLineOptions } from '../types';
/**
 * Insert a code block: set the node to code line and wrap it with a code block.
 * If the cursor is not at the block start, insert break before.
 */
export declare const insertCodeBlock: (editor: Editor, options?: Omit<InsertNodesOptions, 'match'>, pluginsOptions?: CodeBlockOptions & CodeLineOptions) => void;
//# sourceMappingURL=insertCodeBlock.d.ts.map