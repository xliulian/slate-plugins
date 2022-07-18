import { Editor } from 'slate';
/**
 * Hide if not selecting.
 * If hiddenDelay = 0 and the selection changes: show.
 * If hiddenDelay > 0: hide when the selection length changes.
 */
export declare const useBalloonShow: ({ editor, ref, hiddenDelay, }: {
    editor: Editor;
    ref: any;
    hiddenDelay: number;
}) => boolean[];
//# sourceMappingURL=useBalloonShow.d.ts.map