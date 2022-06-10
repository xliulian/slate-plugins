import { Editor } from 'slate';
import { HotkeyOptions } from '../types/PluginOptions.types';
export interface GetOnHotkeyToggleMarkOptions extends HotkeyOptions {
    /**
     * Key of the mark
     */
    type: string;
    /**
     * Mark to clear
     */
    clear?: string | string[];
}
/**
 * Get `onKeyDown` handler to toggle mark if hotkey is pressed.
 */
export declare const getOnHotkeyToggleMark: ({ type, hotkey, clear, }: GetOnHotkeyToggleMarkOptions) => ((e: any, editor: Editor) => void) | undefined;
//# sourceMappingURL=getOnHotkeyToggleMark.d.ts.map