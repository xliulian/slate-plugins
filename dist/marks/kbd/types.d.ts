import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface KbdNodeData {
}
export interface KbdNode extends Text, KbdNodeData {
}
export interface KbdRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface KbdLeafProps extends RenderLeafProps, RenderNodePropsOptions, KbdRenderLeafPropsOptions {
    leaf: KbdNode;
}
export declare type KbdKeyOption = 'kbd';
export declare type KbdPluginOptionsValues = RenderNodeOptions & RootProps<KbdRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type KbdPluginOptionsKeys = keyof KbdPluginOptionsValues;
export declare type KbdPluginOptions<Value extends KbdPluginOptionsKeys = KbdPluginOptionsKeys> = Partial<Record<KbdKeyOption, Pick<KbdPluginOptionsValues, Value>>>;
export declare type KbdRenderLeafOptionsKeys = KbdPluginOptionsKeys;
export interface KbdRenderLeafOptions extends KbdPluginOptions<KbdRenderLeafOptionsKeys> {
}
export interface KbdDeserializeOptions extends KbdPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map