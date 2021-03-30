import { Editor, Location, Path, Point, Range } from 'slate';
/**
 * Get the point from a location (default: selection).
 * If the location is a range, get the anchor point.
 * If the location is a path, get the point at this path with offset 0.
 * If `focus` is true, get the focus point.
 */
export declare const getPointFromLocation: (editor: Editor, { at, focus, }?: {
    at?: Path | Point | Range | null | undefined;
    focus?: boolean | undefined;
}) => Point | undefined;
//# sourceMappingURL=getPointFromLocation.d.ts.map