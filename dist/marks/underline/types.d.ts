import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface UnderlineNodeData {
}
export interface UnderlineNode extends Text, UnderlineNodeData {
}
export interface UnderlineRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface UnderlineLeafProps extends RenderLeafProps, RenderNodePropsOptions, UnderlineRenderLeafPropsOptions {
    leaf: UnderlineNode;
}
export declare type UnderlineKeyOption = 'underline';
export declare type UnderlinePluginOptionsValues = RenderNodeOptions & RootProps<UnderlineRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type UnderlinePluginOptionsKeys = keyof UnderlinePluginOptionsValues;
export declare type UnderlinePluginOptions<Value extends UnderlinePluginOptionsKeys = UnderlinePluginOptionsKeys> = Partial<Record<UnderlineKeyOption, Pick<UnderlinePluginOptionsValues, Value>>>;
export declare type UnderlineRenderLeafOptionsKeys = UnderlinePluginOptionsKeys;
export interface UnderlineRenderLeafOptions extends UnderlinePluginOptions<UnderlineRenderLeafOptionsKeys> {
}
export interface UnderlineDeserializeOptions extends UnderlinePluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map