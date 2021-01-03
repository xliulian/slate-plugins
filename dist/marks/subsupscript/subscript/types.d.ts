import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../../components/StyledComponent/StyledComponent.types';
export interface SubscriptNodeData {
}
export interface SubscriptNode extends Text, SubscriptNodeData {
}
export interface SubscriptRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface SubscriptLeafProps extends RenderLeafProps, RenderNodePropsOptions, SubscriptRenderLeafPropsOptions {
    leaf: SubscriptNode;
}
export declare type SubscriptKeyOption = 'subscript';
export declare type SubscriptPluginOptionsValues = RenderNodeOptions & RootProps<SubscriptRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type SubscriptPluginOptionsKeys = keyof SubscriptPluginOptionsValues;
export declare type SubscriptPluginOptions<Value extends SubscriptPluginOptionsKeys = SubscriptPluginOptionsKeys> = Partial<Record<SubscriptKeyOption, Pick<SubscriptPluginOptionsValues, Value>>>;
export declare type SubscriptRenderLeafOptionsKeys = SubscriptPluginOptionsKeys;
export interface SubscriptRenderLeafOptions extends SubscriptPluginOptions<SubscriptRenderLeafOptionsKeys> {
}
export interface SubscriptDeserializeOptions extends SubscriptPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map