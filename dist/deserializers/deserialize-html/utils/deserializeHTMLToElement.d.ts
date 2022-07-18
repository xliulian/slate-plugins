import { SlatePlugin } from '@udecode/slate-plugins-core';
import { Element } from 'slate';
import { DeserializeHTMLChildren } from '../types';
/**
 * Deserialize HTML to Element.
 */
export declare const deserializeHTMLToElement: ({ plugins, element, children, }: {
    plugins: SlatePlugin[];
    element: HTMLElement;
    children: DeserializeHTMLChildren[];
}) => Element | undefined;
//# sourceMappingURL=deserializeHTMLToElement.d.ts.map