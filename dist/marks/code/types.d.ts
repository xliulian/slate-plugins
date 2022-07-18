import { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { Deserialize, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { GetOnHotkeyToggleMarkOptions } from '../../common/utils/getOnHotkeyToggleMark';
import { StyledComponentPropsOptions } from '../../components/StyledComponent/StyledComponent.types';
export interface CodeNodeData {
}
export interface CodeNode extends Text, CodeNodeData {
}
export interface CodeRenderLeafPropsOptions extends Omit<StyledComponentPropsOptions, 'children'> {
}
export interface CodeLeafProps extends RenderLeafProps, RenderNodePropsOptions, CodeRenderLeafPropsOptions {
    leaf: CodeNode;
}
export declare type CodeKeyOption = 'code';
export declare type CodePluginOptionsValues = RenderNodeOptions & RootProps<CodeRenderLeafPropsOptions> & Partial<GetOnHotkeyToggleMarkOptions> & Deserialize;
export declare type CodePluginOptionsKeys = keyof CodePluginOptionsValues;
export declare type CodePluginOptions<Value extends CodePluginOptionsKeys = CodePluginOptionsKeys> = Partial<Record<CodeKeyOption, Pick<CodePluginOptionsValues, Value>>>;
export declare type CodeRenderLeafOptionsKeys = CodePluginOptionsKeys;
export interface CodeRenderLeafOptions extends CodePluginOptions<CodeRenderLeafOptionsKeys> {
}
export interface CodeDeserializeOptions extends CodePluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
//# sourceMappingURL=types.d.ts.map