import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface HighlightNodeData {
}
export interface HighlightNode extends Text, HighlightNodeData {
}
export interface HighlightRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface HighlightLeafProps extends RenderLeafProps, RenderNodePropsOptions, HighlightRenderLeafPropsOptions {
    leaf: HighlightNode;
}
export declare type HighlightKeyOption = 'highlight';
export declare type HighlightPluginOptionsValues = RenderNodeOptions & RootProps<HighlightRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type HighlightPluginOptionsKeys = keyof HighlightPluginOptionsValues;
export declare type HighlightPluginOptions<Value extends HighlightPluginOptionsKeys = HighlightPluginOptionsKeys> = Partial<Record<HighlightKeyOption, Pick<HighlightPluginOptionsValues, Value>>>;
export declare type HighlightRenderLeafOptionsKeys = HighlightPluginOptionsKeys;
export interface HighlightRenderLeafOptions extends HighlightPluginOptions<HighlightRenderLeafOptionsKeys> {
}
export interface HighlightDeserializeOptions extends HighlightPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map