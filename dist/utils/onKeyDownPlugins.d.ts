import { Editor } from 'slate';
import { OnKeyDown, SlatePlugin } from '../types';
/**
 * Run `onKeyDownList` then `onKeyDown` of each plugin.
 * Stop if one handler returns false.
 */
export declare const onKeyDownPlugins: (editor: Editor, plugins: SlatePlugin[], onKeyDownList: OnKeyDown[]) => (event: any) => void;
//# sourceMappingURL=onKeyDownPlugins.d.ts.map