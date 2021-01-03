import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
export interface CodeBlockNodeData {
}
export interface CodeBlockNode extends ElementWithAttributes, CodeBlockNodeData {
}
export interface CodeBlockRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<CodeBlockElementStyleProps, CodeBlockElementStyles>;
}
export interface CodeBlockElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, CodeBlockRenderElementPropsOptions {
    element: CodeBlockNode;
}
export declare type CodeBlockKeyOption = 'code_block';
export declare type CodeBlockPluginOptionsValues = RenderNodeOptions & RootProps<CodeBlockRenderElementPropsOptions> & NodeToProps<CodeBlockNode, CodeBlockRenderElementPropsOptions> & Deserialize;
export declare type CodeBlockPluginOptionsKeys = keyof CodeBlockPluginOptionsValues;
export declare type CodeBlockPluginOptions<Value extends CodeBlockPluginOptionsKeys = CodeBlockPluginOptionsKeys> = Partial<Record<CodeBlockKeyOption, Pick<CodeBlockPluginOptionsValues, Value>>>;
export declare type CodeBlockRenderElementOptionsKeys = CodeBlockPluginOptionsKeys;
export interface CodeBlockRenderElementOptions extends CodeBlockPluginOptions<CodeBlockRenderElementOptionsKeys> {
}
export interface CodeBlockDeserializeOptions extends CodeBlockPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface CodeBlockElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
}
export interface CodeBlockElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
}
//# sourceMappingURL=types.d.ts.map