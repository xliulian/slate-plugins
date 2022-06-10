import { Ancestor, Editor, Node, NodeEntry } from 'slate';
export interface OutdentCodeLineOptions {
    codeBlock: NodeEntry<Ancestor>;
    codeLine: NodeEntry<Ancestor | Node>;
}
/**
 * Outdent the code line.
 * Remove 2 whitespace characters if any.
 */
export declare const outdentCodeLine: (editor: Editor, { codeBlock, codeLine }: OutdentCodeLineOptions) => void;
//# sourceMappingURL=outdentCodeLine.d.ts.map