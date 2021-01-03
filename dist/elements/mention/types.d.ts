import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
export interface UseMentionOptions extends MentionPluginOptions {
    trigger?: string;
    maxSuggestions?: number;
}
export interface MentionNodeData {
    value: string;
    [key: string]: any;
}
export interface MentionNode extends ElementWithAttributes, MentionNodeData {
}
export interface MentionRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<MentionElementStyleProps, MentionElementStyles>;
    /**
     * Prefix rendered before mention
     */
    prefix?: string;
    onClick?: (mentionNode: MentionNode) => void;
}
export interface MentionElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, MentionRenderElementPropsOptions {
    element: MentionNode;
}
export declare type MentionKeyOption = 'mention';
export declare type MentionPluginOptionsValues = RenderNodeOptions & RootProps<MentionRenderElementPropsOptions> & NodeToProps<MentionNode, MentionRenderElementPropsOptions> & Deserialize;
export declare type MentionPluginOptionsKeys = keyof MentionPluginOptionsValues;
export declare type MentionPluginOptions<Value extends MentionPluginOptionsKeys = MentionPluginOptionsKeys> = Partial<Record<MentionKeyOption, Pick<MentionPluginOptionsValues, Value>>>;
export declare type MentionRenderElementOptionsKeys = MentionPluginOptionsKeys;
export interface MentionRenderElementOptions extends MentionPluginOptions<MentionRenderElementOptionsKeys> {
}
export interface MentionDeserializeOptions extends MentionPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface WithMentionOptions extends MentionPluginOptions<'type'> {
}
export interface MentionElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
}
export interface MentionElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
    selected?: boolean;
    focused?: boolean;
}
//# sourceMappingURL=types.d.ts.map