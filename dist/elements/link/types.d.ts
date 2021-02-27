import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { RangeBeforeOptions } from '../../common/queries/getRangeBefore';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { StyledComponentStyleProps, StyledComponentStyles } from '../../components/StyledComponent/StyledComponent.types';
export interface LinkNodeData {
    url: string;
}
export interface LinkNode extends ElementWithAttributes, LinkNodeData {
}
export interface LinkRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<StyledComponentStyleProps, StyledComponentStyles>;
}
export interface LinkElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, LinkRenderElementPropsOptions {
    element: LinkNode;
}
export declare type LinkKeyOption = 'link';
export declare type LinkPluginOptionsValues = RenderNodeOptions & RootProps<LinkRenderElementPropsOptions> & NodeToProps<LinkNode, LinkRenderElementPropsOptions> & Deserialize & {
    /**
     * Callback to validate an url.
     */
    isUrl?: (text: string) => boolean;
    attribute?: string;
};
export declare type LinkPluginOptionsKeys = keyof LinkPluginOptionsValues;
export declare type LinkPluginOptions<Value extends LinkPluginOptionsKeys = LinkPluginOptionsKeys> = Partial<Record<LinkKeyOption, Pick<LinkPluginOptionsValues, Value>>>;
export declare type LinkRenderElementOptionsKeys = LinkPluginOptionsKeys;
export interface LinkRenderElementOptions extends LinkPluginOptions<'type' | 'component' | 'rootProps' | 'nodeToProps'> {
}
export interface LinkDeserializeOptions extends LinkPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface WithLinkOptions extends LinkPluginOptions<'type' | 'isUrl'> {
    /**
     * Allow custom config for rangeBeforeOptions.
     */
    rangeBeforeOptions?: RangeBeforeOptions;
}
export interface LinkOptions extends LinkPluginOptions<'type'> {
}
export interface LinkElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
}
export interface LinkElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
}
//# sourceMappingURL=types.d.ts.map