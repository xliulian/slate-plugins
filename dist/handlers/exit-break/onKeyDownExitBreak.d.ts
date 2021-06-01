import { Editor } from 'slate';
import { ExitBreakOnKeyDownOptions } from './types';
/**
 * Check if the selection is at the edge of its parent block.
 * If it is and if the selection is expanded, delete its content.
 */
export declare const exitBreakAtEdges: (editor: Editor, { start, end, }: {
    start?: boolean | undefined;
    end?: boolean | undefined;
}) => {
    queryEdge: boolean;
    isEdge: boolean;
    isStart: boolean;
};
export declare const onKeyDownExitBreak: ({ rules, }?: ExitBreakOnKeyDownOptions) => (event: KeyboardEvent, editor: Editor) => void;
//# sourceMappingURL=onKeyDownExitBreak.d.ts.map