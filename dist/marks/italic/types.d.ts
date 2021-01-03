import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface ItalicNodeData {
}
export interface ItalicNode extends Text, ItalicNodeData {
}
export interface ItalicRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface ItalicLeafProps extends RenderLeafProps, RenderNodePropsOptions, ItalicRenderLeafPropsOptions {
    leaf: ItalicNode;
}
export declare type ItalicKeyOption = 'italic';
export declare type ItalicPluginOptionsValues = RenderNodeOptions & RootProps<ItalicRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type ItalicPluginOptionsKeys = keyof ItalicPluginOptionsValues;
export declare type ItalicPluginOptions<Value extends ItalicPluginOptionsKeys = ItalicPluginOptionsKeys> = Partial<Record<ItalicKeyOption, Pick<ItalicPluginOptionsValues, Value>>>;
export declare type ItalicRenderLeafOptionsKeys = ItalicPluginOptionsKeys;
export interface ItalicRenderLeafOptions extends ItalicPluginOptions<ItalicRenderLeafOptionsKeys> {
}
export interface ItalicDeserializeOptions extends ItalicPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map