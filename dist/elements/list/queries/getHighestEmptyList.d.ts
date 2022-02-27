import { Editor, Path } from 'slate';
import { ListOptions } from '../types';
/**
 * Find the highest end list that can be deleted.
 * Its path should be different to diffListPath.
 * If the highest end list 2+ items, return liPath.
 * Get the parent list until:
 * - the list has less than 2 items.
 * - its path is not equals to diffListPath.
 */
export declare const getHighestEmptyList: (editor: Editor, liPath: Path, diffListPath?: Path | undefined, options?: ListOptions | undefined) => Path | undefined;
//# sourceMappingURL=getHighestEmptyList.d.ts.map