import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface AlignNodeData {
}
export interface AlignNode extends ElementWithAttributes, AlignNodeData {
}
export interface AlignRenderElementPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface AlignElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, AlignRenderElementPropsOptions {
    element: AlignNode;
}
export declare type AlignKeyOption = 'align_left' | 'align_center' | 'align_right';
export declare type AlignPluginOptionsValues = RenderNodeOptions & RootProps<AlignRenderElementPropsOptions> & NodeToProps<AlignNode, AlignRenderElementPropsOptions> & Deserialize;
export declare type AlignPluginOptionsKeys = keyof AlignPluginOptionsValues;
export declare type AlignPluginOptions<Value extends AlignPluginOptionsKeys = AlignPluginOptionsKeys> = Partial<Record<AlignKeyOption, Pick<AlignPluginOptionsValues, Value>>>;
export declare type AlignRenderElementOptionsKeys = AlignPluginOptionsKeys;
export interface AlignRenderElementOptions extends AlignPluginOptions<AlignRenderElementOptionsKeys> {
}
export interface AlignDeserializeOptions extends AlignPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map