import { SlatePlugin } from '@udecode/slate-plugins-core';
import { Node as SlateNode } from 'slate';
import { SlateProps } from '../../common/types/Slate.types';
/**
 * Convert Slate Nodes into HTML string
 */
export declare const serializeHTMLFromNodes: ({ plugins, nodes, slateProps, stripDataAttributes, }: {
    /**
     * Plugins with renderElement or renderLeaf.
     */
    plugins: SlatePlugin[];
    /**
     * Slate nodes to convert to HTML.
     */
    nodes: SlateNode[];
    /**
     * Enable stripping data attributes
     */
    stripDataAttributes?: boolean | undefined;
    /**
     * Slate props to provide if the rendering depends on slate hooks
     */
    slateProps?: Partial<SlateProps> | undefined;
}) => string;
//# sourceMappingURL=serializeHTMLFromNodes.d.ts.map