import { Editor, Point } from 'slate';
/**
 * Is the word at the point after a trigger (punctuation character)
 * https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/utils/string.ts#L6
 */
export declare const isWordAfterTrigger: (editor: Editor, { at, trigger }: {
    at: Point;
    trigger: string;
}) => {
    range: import("slate").Range | undefined;
    match: false | RegExpMatchArray | null;
};
//# sourceMappingURL=isWordAfterTrigger.d.ts.map