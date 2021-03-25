import { Ancestor, Editor, Node, NodeEntry } from 'slate';
export interface IndentCodeLineOptions {
    codeBlock: NodeEntry<Ancestor>;
    codeLine: NodeEntry<Ancestor | Node>;
}
/**
 * Indent if:
 * - the selection is expanded
 * - the selected code line has no whitespace character
 * Indentation = 2 spaces.
 */
export declare const indentCodeLine: (editor: Editor, { codeLine }: IndentCodeLineOptions) => void;
//# sourceMappingURL=indentCodeLine.d.ts.map