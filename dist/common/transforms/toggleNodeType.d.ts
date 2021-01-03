import { Editor } from 'slate';
import { EditorNodesOptions } from '../types/Editor.types';
export interface ToggleNodeTypeOptions {
    /**
     * If there is no node type above the selection, set the selected node type to activeType.
     */
    activeType: string;
    /**
     * If there is a node type above the selection, set the selected node type to inactiveType.
     */
    inactiveType?: string;
}
/**
 * Toggle the type of the selected node.
 * Don't do anything if activeType === inactiveType.
 */
export declare const toggleNodeType: (editor: Editor, options: ToggleNodeTypeOptions, editorNodesOptions?: Pick<EditorNodesOptions, "at" | "mode" | "universal" | "reverse" | "voids"> | undefined) => void;
//# sourceMappingURL=toggleNodeType.d.ts.map