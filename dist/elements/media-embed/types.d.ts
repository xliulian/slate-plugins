import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { StyledComponentStyleProps, StyledComponentStyles } from '../../components/StyledComponent/StyledComponent.types';
export interface MediaEmbedNodeData {
    url: string;
}
export interface MediaEmbedNode extends ElementWithAttributes, MediaEmbedNodeData {
}
export interface MediaEmbedRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<StyledComponentStyleProps, StyledComponentStyles>;
}
export interface MediaEmbedElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, MediaEmbedRenderElementPropsOptions {
    element: MediaEmbedNode;
}
export declare type MediaEmbedKeyOption = 'media_embed';
export declare type MediaEmbedPluginOptionsValues = RenderNodeOptions & RootProps<MediaEmbedRenderElementPropsOptions> & NodeToProps<MediaEmbedNode, MediaEmbedRenderElementPropsOptions> & Deserialize;
export declare type MediaEmbedPluginOptionsKeys = keyof MediaEmbedPluginOptionsValues;
export declare type MediaEmbedPluginOptions<Value extends MediaEmbedPluginOptionsKeys = MediaEmbedPluginOptionsKeys> = Partial<Record<MediaEmbedKeyOption, Pick<MediaEmbedPluginOptionsValues, Value>>>;
export declare type MediaEmbedRenderElementOptionsKeys = MediaEmbedPluginOptionsKeys;
export interface MediaEmbedRenderElementOptions extends MediaEmbedPluginOptions<MediaEmbedRenderElementOptionsKeys> {
}
export interface MediaEmbedDeserializeOptions extends MediaEmbedPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface MediaEmbedElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
    iframeWrapper?: IStyle;
    iframe?: IStyle;
    input?: IStyle;
}
export interface MediaEmbedElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
}
//# sourceMappingURL=types.d.ts.map