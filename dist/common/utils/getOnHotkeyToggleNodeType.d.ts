import { Editor } from 'slate';
import { HotkeyOptions } from '../types/PluginOptions.types';
export interface GetOnHotkeyToggleNodeTypeOptions extends HotkeyOptions {
    /**
     * Key of the mark
     */
    type: string;
}
/**
 * Get `onKeyDown` handler to toggle node type if hotkey is pressed.
 */
export declare const getOnHotkeyToggleNodeType: ({ type, defaultType, hotkey, }: GetOnHotkeyToggleNodeTypeOptions) => ((e: any, editor: Editor) => void) | undefined;
//# sourceMappingURL=getOnHotkeyToggleNodeType.d.ts.map