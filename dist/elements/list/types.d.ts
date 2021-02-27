import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { StyledComponentStyleProps, StyledComponentStyles } from '../../components/StyledComponent/StyledComponent.types';
export declare const ListHotkey: {
    TAB: string;
    ENTER: string;
    DELETE_BACKWARD: string;
};
export interface ListNodeData {
}
export interface ListNode extends ElementWithAttributes, ListNodeData {
}
export interface ListRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<StyledComponentStyleProps, StyledComponentStyles>;
}
export interface ListElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, ListRenderElementPropsOptions {
    element: ListNode;
}
export declare type ListKeyOption = 'ul' | 'ol' | 'li' | 'p';
export declare type ListPluginOptionsValues = RenderNodeOptions & RootProps<ListRenderElementPropsOptions> & NodeToProps<ListNode, ListRenderElementPropsOptions> & Deserialize;
export declare type ListPluginOptionsKeys = keyof ListPluginOptionsValues;
export declare type ListPluginOptions<Value extends ListPluginOptionsKeys = ListPluginOptionsKeys> = Partial<Record<ListKeyOption, Pick<ListPluginOptionsValues, Value>>>;
export declare type ListRenderElementOptionsKeys = ListPluginOptionsKeys;
export interface ListRenderElementOptions extends ListPluginOptions<ListRenderElementOptionsKeys> {
}
export interface ListDeserializeOptions extends ListPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface ListOnKeyDownOptions extends ListPluginOptions<'type'> {
}
export interface ListOptions extends ListPluginOptions<'type'> {
}
export interface WithListOptions extends ListOptions {
    /**
     * Valid children types for list items, in addition to p and ul types.
     */
    validLiChildrenTypes?: string[];
}
export interface ListNormalizerOptions extends Pick<WithListOptions, 'validLiChildrenTypes'> {
}
//# sourceMappingURL=types.d.ts.map