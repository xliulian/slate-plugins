import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface SearchHighlightNodeData {
}
export interface SearchHighlightNode extends Text, SearchHighlightNodeData {
}
export interface SearchHighlightRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface SearchHighlightLeafProps extends RenderLeafProps, RenderNodePropsOptions, SearchHighlightRenderLeafPropsOptions {
    leaf: SearchHighlightNode;
}
export declare type SearchHighlightKeyOption = 'search_highlight';
export declare type SearchHighlightPluginOptionsValues = RenderNodeOptions & RootProps<SearchHighlightRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions>;
export declare type SearchHighlightPluginOptionsKeys = keyof SearchHighlightPluginOptionsValues;
export declare type SearchHighlightPluginOptions<Value extends SearchHighlightPluginOptionsKeys = SearchHighlightPluginOptionsKeys> = Partial<Record<SearchHighlightKeyOption, Pick<SearchHighlightPluginOptionsValues, Value>>>;
export declare type SearchHighlightRenderLeafOptionsKeys = SearchHighlightPluginOptionsKeys;
export interface SearchHighlightRenderLeafOptions extends SearchHighlightPluginOptions<SearchHighlightRenderLeafOptionsKeys> {
}
export interface SearchHighlightDeserializeOptions extends SearchHighlightPluginOptions<'type' | 'rootProps'> {
}
export interface SearchHighlightDecorateOptions extends SearchHighlightPluginOptions<'type'> {
    /**
     * Searching text to highlight
     */
    search: string;
}
//# sourceMappingURL=types.d.ts.map