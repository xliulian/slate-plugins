import { Editor, Location, Range } from 'slate';
import { PointBeforeOptions } from './getPointBefore';
export interface RangeBeforeOptions extends PointBeforeOptions {
}
/**
 * Get range from {@link getPointBefore} to the end point of `at`.
 */
export declare const getRangeBefore: (editor: Editor, at: Location, options?: RangeBeforeOptions | undefined) => Range | undefined;
//# sourceMappingURL=getRangeBefore.d.ts.map