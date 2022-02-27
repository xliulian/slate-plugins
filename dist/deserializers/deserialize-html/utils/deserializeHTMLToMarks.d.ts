import { SlatePlugin } from '@udecode/slate-plugins-core';
import { Descendant } from 'slate';
import { DeserializeHTMLChildren } from '../types';
export interface DeserializeMarksProps {
    plugins: SlatePlugin[];
    element: HTMLElement;
    children: DeserializeHTMLChildren[];
}
/**
 * Deserialize HTML to Descendant[] with marks on Text.
 * Build the leaf from the leaf deserializers of each plugin.
 */
export declare const deserializeHTMLToMarks: ({ plugins, element, children, }: DeserializeMarksProps) => Descendant[];
//# sourceMappingURL=deserializeHTMLToMarks.d.ts.map