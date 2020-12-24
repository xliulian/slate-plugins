import * as React from 'react';
import { Decorate, OnDOMBeforeInput, OnKeyDown, RenderElement, RenderLeaf, SlatePlugin } from '../types';
export interface EditablePluginsProps extends Omit<React.TextareaHTMLAttributes<HTMLDivElement>, 'value' | 'onChange' | 'onKeyDown'> {
    [key: string]: any;
    as?: React.ElementType;
    /**
     * Each plugin fields will be combined by role.
     *
     * To render `Editable`:
     * - decorate
     * - renderElement
     * - renderLeaf
     * - onDOMBeforeInput
     * - onKeyDown
     */
    plugins?: SlatePlugin[];
    /**
     * Decorations are another type of text-level formatting.
     * They are similar to regular old custom properties,
     * except each one applies to a Range of the document instead of being
     * associated with a given text node.
     * However, decorations are computed at render-time based on the content itself.
     * This is helpful for dynamic formatting like syntax highlighting or search
     * keywords, where changes to the content (or some external data) has the
     * potential to change the formatting.
     */
    decorate?: Decorate[];
    decorateDeps?: any[];
    /**
     * To customize the rendering of each element components.
     * Element properties are for contiguous, semantic elements in the document.
     */
    renderElement?: RenderElement[];
    renderElementDeps?: any[];
    /**
     * To customize the rendering of each leaf.
     * When text-level formatting is rendered, the characters are grouped into
     * "leaves" of text that each contain the same formatting applied to them.
     * Text properties are for non-contiguous, character-level formatting.
     */
    renderLeaf?: RenderLeaf[];
    renderLeafDeps?: any[];
    onDOMBeforeInput?: OnDOMBeforeInput[];
    onDOMBeforeInputDeps?: any[];
    /**
     * Handlers when we press a key
     */
    onKeyDown?: OnKeyDown[];
    onKeyDownDeps?: any[];
}
/**
 * {@link Editable} with plugins support.
 */
export declare const EditablePlugins: ({ plugins, decorate: decorateList, decorateDeps, renderElement: renderElementList, renderElementDeps, renderLeaf: renderLeafList, renderLeafDeps, onDOMBeforeInput: onDOMBeforeInputList, onDOMBeforeInputDeps, onKeyDown: onKeyDownList, onKeyDownDeps, ...props }: EditablePluginsProps) => JSX.Element;
//# sourceMappingURL=EditablePlugins.d.ts.map