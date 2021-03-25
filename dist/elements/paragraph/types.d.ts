import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface ParagraphNodeData {
}
export interface ParagraphNode extends ElementWithAttributes, ParagraphNodeData {
}
export interface ParagraphRenderElementPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface ParagraphElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, ParagraphRenderElementPropsOptions {
    element: ParagraphNode;
}
export declare type ParagraphKeyOption = 'p';
export declare type ParagraphPluginOptionsValues = RenderNodeOptions & RootProps<ParagraphRenderElementPropsOptions> & NodeToProps<ParagraphNode, ParagraphRenderElementPropsOptions> & Deserialize;
export declare type ParagraphPluginOptionsKeys = keyof ParagraphPluginOptionsValues;
export declare type ParagraphPluginOptions<Value extends ParagraphPluginOptionsKeys = ParagraphPluginOptionsKeys> = Partial<Record<ParagraphKeyOption, Pick<ParagraphPluginOptionsValues, Value>>>;
export declare type ParagraphRenderElementOptionsKeys = ParagraphPluginOptionsKeys;
export interface ParagraphRenderElementOptions extends ParagraphPluginOptions<ParagraphRenderElementOptionsKeys> {
}
export interface ParagraphDeserializeOptions extends ParagraphPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map