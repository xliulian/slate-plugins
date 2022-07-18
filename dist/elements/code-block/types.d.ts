import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
export interface CodeBlockNodeData {
}
export interface CodeLineNodeData {
}
export interface CodeBlockNode extends ElementWithAttributes, CodeBlockNodeData {
}
export interface CodeLineNode extends ElementWithAttributes, CodeLineNodeData {
}
export interface CodeBlockRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<CodeBlockElementStyleProps, CodeBlockElementStyles>;
}
export interface CodeLineRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<CodeLineElementStyleProps, CodeLineElementStyles>;
}
export interface CodeBlockElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, CodeBlockRenderElementPropsOptions {
    element: CodeBlockNode;
}
export interface CodeLineElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, CodeLineRenderElementPropsOptions {
    element: CodeLineNode;
}
export declare type CodeBlockKeyOption = 'code_block';
export declare type CodeLineKeyOption = 'code_line';
export declare type CodeBlockPluginOptionsValues = RenderNodeOptions & RootProps<CodeBlockRenderElementPropsOptions> & NodeToProps<CodeBlockNode, CodeBlockRenderElementPropsOptions> & Deserialize;
export declare type CodeBlockPluginOptionsKeys = keyof CodeBlockPluginOptionsValues;
export declare type CodeBlockPluginOptions<Value extends CodeBlockPluginOptionsKeys = CodeBlockPluginOptionsKeys> = Partial<Record<CodeBlockKeyOption, Pick<CodeBlockPluginOptionsValues, Value>>>;
export declare type CodeLinePluginOptionsValues = RenderNodeOptions & RootProps<CodeLineRenderElementPropsOptions> & NodeToProps<CodeLineNode, CodeLineRenderElementPropsOptions> & Deserialize;
export declare type CodeLinePluginOptionsKeys = keyof CodeLinePluginOptionsValues;
export declare type CodeLinePluginOptions<Value extends CodeLinePluginOptionsKeys = CodeLinePluginOptionsKeys> = Partial<Record<CodeLineKeyOption, Pick<CodeLinePluginOptionsValues, Value>>>;
export declare type CodeBlockRenderElementOptionsKeys = CodeBlockPluginOptionsKeys;
export interface CodeBlockRenderElementOptions extends CodeBlockPluginOptions<CodeBlockRenderElementOptionsKeys> {
}
export declare type CodeLineRenderElementOptionsKeys = CodeLinePluginOptionsKeys;
export interface CodeLineRenderElementOptions extends CodeLinePluginOptions<CodeLineRenderElementOptionsKeys> {
}
export interface CodeBlockDeserializeOptions extends CodeBlockPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface CodeLineDeserializeOptions extends CodeLinePluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface CodeBlockDecorateOptions extends CodeBlockPluginOptions<'type'> {
}
export interface CodeBlockOnKeyDownOptions extends CodeBlockPluginOptions<'type'> {
}
export interface CodeLineOnKeyDownOptions extends CodeLinePluginOptions<'type'> {
}
export interface CodeBlockOptions extends CodeBlockPluginOptions<'type'> {
}
export interface CodeLineOptions extends CodeLinePluginOptions<'type'> {
}
export interface CodeBlockInsertOptions {
    /**
     * @default 'p'
     */
    defaultType?: string;
    /**
     * @default 1
     */
    level?: number;
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
export interface CodeLineElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
}
export interface CodeLineElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
}
export interface WithCodeBlockOptions extends CodeBlockOptions {
    /**
     * Valid children types for code_block, in addition to code_line types.
     */
    validCodeBlockChildrenTypes?: string[];
}
export interface WithCodeLineOptions extends CodeLineOptions {
}
export interface CodeBlockNormalizerOptions extends Pick<WithCodeBlockOptions, 'validCodeBlockChildrenTypes'> {
}
//# sourceMappingURL=types.d.ts.map