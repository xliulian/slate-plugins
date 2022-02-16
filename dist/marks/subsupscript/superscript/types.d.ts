import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../../components/StyledComponent/StyledComponent.types';
export interface SuperscriptNodeData {
}
export interface SuperscriptNode extends Text, SuperscriptNodeData {
}
export interface SuperscriptRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface SuperscriptLeafProps extends RenderLeafProps, RenderNodePropsOptions, SuperscriptRenderLeafPropsOptions {
    leaf: SuperscriptNode;
}
export declare type SuperscriptKeyOption = 'superscript';
export declare type SuperscriptPluginOptionsValues = RenderNodeOptions & RootProps<SuperscriptRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type SuperscriptPluginOptionsKeys = keyof SuperscriptPluginOptionsValues;
export declare type SuperscriptPluginOptions<Value extends SuperscriptPluginOptionsKeys = SuperscriptPluginOptionsKeys> = Partial<Record<SuperscriptKeyOption, Pick<SuperscriptPluginOptionsValues, Value>>>;
export declare type SuperscriptRenderLeafOptionsKeys = SuperscriptPluginOptionsKeys;
export interface SuperscriptRenderLeafOptions extends SuperscriptPluginOptions<SuperscriptRenderLeafOptionsKeys> {
}
export interface SuperscriptDeserializeOptions extends SuperscriptPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map