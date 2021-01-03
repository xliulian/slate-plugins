import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
export interface ImageNodeData {
    url: string;
}
export interface ImageNode extends ElementWithAttributes, ImageNodeData {
}
export interface ImageRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ImageElementStyleProps, ImageElementStyles>;
    /**
     * The provided function is invoked by clicking on the the ToolbarImage, and the
     * resulting url is inserted as an image to the document.
     */
    getImageUrl?: () => Promise<string>;
}
export interface ImageElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, ImageRenderElementPropsOptions {
    element: ImageNode;
}
export declare type ImageKeyOption = 'img';
export declare type ImagePluginOptionsValues = RenderNodeOptions & RootProps<ImageRenderElementPropsOptions> & NodeToProps<ImageNode, ImageRenderElementPropsOptions> & Deserialize;
export declare type ImagePluginOptionsKeys = keyof ImagePluginOptionsValues;
export declare type ImagePluginOptions<Value extends ImagePluginOptionsKeys = ImagePluginOptionsKeys> = Partial<Record<ImageKeyOption, Pick<ImagePluginOptionsValues, Value>>>;
export declare type ImageRenderElementOptionsKeys = ImagePluginOptionsKeys;
export interface ImageRenderElementOptions extends ImagePluginOptions<ImageRenderElementOptionsKeys> {
}
export interface ImageDeserializeOptions extends ImagePluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface ImageElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
    img?: IStyle;
}
export interface ImageElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
    selected?: boolean;
    focused?: boolean;
}
//# sourceMappingURL=types.d.ts.map