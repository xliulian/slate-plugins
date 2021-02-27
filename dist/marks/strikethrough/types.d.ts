import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface StrikethroughNodeData {
}
export interface StrikethroughNode extends Text, StrikethroughNodeData {
}
export interface StrikethroughRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface StrikethroughLeafProps extends RenderLeafProps, RenderNodePropsOptions, StrikethroughRenderLeafPropsOptions {
    leaf: StrikethroughNode;
}
export declare type StrikethroughKeyOption = 'strikethrough';
export declare type StrikethroughPluginOptionsValues = RenderNodeOptions & RootProps<StrikethroughRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type StrikethroughPluginOptionsKeys = keyof StrikethroughPluginOptionsValues;
export declare type StrikethroughPluginOptions<Value extends StrikethroughPluginOptionsKeys = StrikethroughPluginOptionsKeys> = Partial<Record<StrikethroughKeyOption, Pick<StrikethroughPluginOptionsValues, Value>>>;
export declare type StrikethroughRenderLeafOptionsKeys = StrikethroughPluginOptionsKeys;
export interface StrikethroughRenderLeafOptions extends StrikethroughPluginOptions<StrikethroughRenderLeafOptionsKeys> {
}
export interface StrikethroughDeserializeOptions extends StrikethroughPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map