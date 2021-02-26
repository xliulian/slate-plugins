import { Editor, Point, Range } from 'slate';
import { MentionNodeData, UseMentionOptions } from './types';
export declare const matchesTriggerAndPattern: (editor: Editor, { at, trigger, pattern }: {
    at: Point;
    trigger: string;
    pattern: string;
}) => {
    range: Range | null | undefined;
    match: false | RegExpMatchArray | null;
};
export declare const useMention: (mentionables?: MentionNodeData[], { maxSuggestions, trigger, mentionableFilter, mentionableSearchPattern, insertSpaceAfterMention, ...options }?: UseMentionOptions) => {
    search: string;
    index: number;
    target: Range | null;
    values: MentionNodeData[];
    onChangeMention: (editor: Editor) => void;
    onKeyDownMention: (e: any, editor: Editor) => false | void;
    onAddMention: (editor: Editor, data: MentionNodeData) => void;
};
//# sourceMappingURL=useMention.d.ts.map