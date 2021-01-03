import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { StyledComponentStyleProps, StyledComponentStyles } from '../../components/StyledComponent/StyledComponent.types';
export interface HeadingNodeData {
}
export interface HeadingNode extends ElementWithAttributes, HeadingNodeData {
}
export interface HeadingRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<StyledComponentStyleProps, StyledComponentStyles>;
    baseFontSize?: number;
}
export interface HeadingElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, HeadingRenderElementPropsOptions {
    element: HeadingNode;
}
export interface HeadingLevelsOption {
    /**
     * Heading levels supported from 1 to `levels`
     */
    levels?: number;
}
export declare type HeadingKeyOption = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export declare type HeadingPluginOptionsValues = RenderNodeOptions & RootProps<HeadingRenderElementPropsOptions> & NodeToProps<HeadingNode, HeadingRenderElementPropsOptions> & Deserialize;
export declare type HeadingPluginOptionsKeys = keyof HeadingPluginOptionsValues;
export declare type HeadingPluginOptions<Value extends HeadingPluginOptionsKeys = HeadingPluginOptionsKeys> = Partial<Record<HeadingKeyOption, Pick<HeadingPluginOptionsValues, Value>>> & HeadingLevelsOption;
export declare type HeadingRenderElementOptionsKeys = HeadingPluginOptionsKeys;
export interface HeadingRenderElementOptions extends HeadingPluginOptions<HeadingRenderElementOptionsKeys>, HeadingLevelsOption {
}
export interface HeadingDeserializeOptions extends HeadingPluginOptions<'type' | 'rootProps' | 'deserialize'>, HeadingLevelsOption {
}
//# sourceMappingURL=types.d.ts.map