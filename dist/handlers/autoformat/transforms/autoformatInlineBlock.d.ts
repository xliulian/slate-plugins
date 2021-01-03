import { Editor } from 'slate';
import { AutoformatRule } from '../types';
/**
 * Autoformat in the middle of a block
 */
export declare const autoformatInlineBlock: (editor: Editor, { type, markup, preFormat, format, }: Pick<AutoformatRule, 'type' | 'markup' | 'preFormat' | 'format'>) => true | undefined;
//# sourceMappingURL=autoformatInlineBlock.d.ts.map