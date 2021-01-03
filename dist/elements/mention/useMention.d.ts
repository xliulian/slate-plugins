import { Editor, Range } from 'slate';
import { MentionNodeData, UseMentionOptions } from './types';
export declare const useMention: (mentionables?: MentionNodeData[], { maxSuggestions, trigger, ...options }?: UseMentionOptions) => {
    search: string;
    index: number;
    target: Range | null;
    values: MentionNodeData[];
    onChangeMention: (editor: Editor) => void;
    onKeyDownMention: (e: any, editor: Editor) => false | void;
    onAddMention: (editor: Editor, data: MentionNodeData) => void;
};
//# sourceMappingURL=useMention.d.ts.map