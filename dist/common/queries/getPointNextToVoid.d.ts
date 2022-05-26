import { Editor, Point } from 'slate';
/**
 * If the start point is inside an inline void, get the point before or after it.
 */
export declare const getPointNextToVoid: (editor: Editor, { at, after, }: {
    at: Point;
    /**
     * Get the point after (instead of before) the void node.
     */
    after?: boolean | undefined;
}) => Point;
//# sourceMappingURL=getPointNextToVoid.d.ts.map