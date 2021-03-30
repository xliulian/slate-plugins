import { Editor, Location, Point } from 'slate';
export interface BeforeOptions {
    distance?: number | undefined;
    unit?: 'character' | 'word' | 'line' | 'block' | 'offset' | undefined;
}
export interface PointBeforeOptions extends BeforeOptions {
    /**
     * Lookup before the location for `matchString`.
     */
    matchString?: string | string[];
    /**
     * Lookup before the location until this predicate is true
     */
    match?: (value: {
        beforeString: string;
        beforePoint: Point;
        at: Location;
    }) => boolean;
    /**
     * If true, get the point after the matching point.
     * If false, get the matching point.
     */
    afterMatch?: boolean;
    /**
     * If true, lookup until the start of the editor value.
     * If false, lookup until the first invalid character.
     */
    skipInvalid?: boolean;
    /**
     * Allow lookup across multiple node paths.
     */
    multiPaths?: boolean;
}
/**
 * {@link Editor.before} with additional options.
 * TODO: support for sequence of any characters.
 */
export declare const getPointBefore: (editor: Editor, at: Location, options?: PointBeforeOptions | undefined) => any;
//# sourceMappingURL=getPointBefore.d.ts.map