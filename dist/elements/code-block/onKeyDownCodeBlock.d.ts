import { Editor } from 'slate';
import { CodeBlockOnKeyDownOptions, CodeLineOnKeyDownOptions } from './types';
/**
 * - Shift+Tab: outdent code line.
 * - Tab: indent code line.
 */
export declare const onKeyDownCodeBlock: (options?: (CodeBlockOnKeyDownOptions & CodeLineOnKeyDownOptions) | undefined) => (e: KeyboardEvent, editor: Editor) => void;
//# sourceMappingURL=onKeyDownCodeBlock.d.ts.map