import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface BoldNodeData {
}
export interface BoldNode extends Text, BoldNodeData {
}
export interface BoldRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface BoldLeafProps extends RenderLeafProps, RenderNodePropsOptions, BoldRenderLeafPropsOptions {
    leaf: BoldNode;
}
export declare type BoldKeyOption = 'bold';
export declare type BoldPluginOptionsValues = RenderNodeOptions & RootProps<BoldRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type BoldPluginOptionsKeys = keyof BoldPluginOptionsValues;
export declare type BoldPluginOptions<Value extends BoldPluginOptionsKeys = BoldPluginOptionsKeys> = Partial<Record<BoldKeyOption, Pick<BoldPluginOptionsValues, Value>>>;
export declare type BoldRenderLeafOptionsKeys = BoldPluginOptionsKeys;
export interface BoldRenderLeafOptions extends BoldPluginOptions<BoldRenderLeafOptionsKeys> {
}
export interface BoldDeserializeOptions extends BoldPluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map