import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
export interface BlockquoteNodeData {
}
export interface BlockquoteNode extends ElementWithAttributes, BlockquoteNodeData {
}
export interface BlockquoteRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<BlockquoteElementStyleProps, BlockquoteElementStyles>;
}
export interface BlockquoteElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, BlockquoteRenderElementPropsOptions {
    element: BlockquoteNode;
}
export declare type BlockquoteKeyOption = 'blockquote';
export declare type BlockquotePluginOptionsValues = RenderNodeOptions & RootProps<BlockquoteRenderElementPropsOptions> & NodeToProps<BlockquoteNode, BlockquoteRenderElementPropsOptions> & Deserialize;
export declare type BlockquotePluginOptionsKeys = keyof BlockquotePluginOptionsValues;
export declare type BlockquotePluginOptions<Value extends BlockquotePluginOptionsKeys = BlockquotePluginOptionsKeys> = Partial<Record<BlockquoteKeyOption, Pick<BlockquotePluginOptionsValues, Value>>>;
export declare type BlockquoteRenderElementOptionsKeys = BlockquotePluginOptionsKeys;
export interface BlockquoteRenderElementOptions extends BlockquotePluginOptions<BlockquoteRenderElementOptionsKeys> {
}
export interface BlockquoteDeserializeOptions extends BlockquotePluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface BlockquoteElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
}
export interface BlockquoteElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
}
//# sourceMappingURL=types.d.ts.map