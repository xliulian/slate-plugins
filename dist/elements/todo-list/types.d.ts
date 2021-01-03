import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
import { StyledComponentStyleProps, StyledComponentStyles } from '../../components/StyledComponent/StyledComponent.types';
export interface TodoListNodeData {
    checked?: boolean;
}
export interface TodoListNode extends ElementWithAttributes, TodoListNodeData {
}
export interface TodoListRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<StyledComponentStyleProps, StyledComponentStyles>;
}
export interface TodoListElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, TodoListRenderElementPropsOptions {
    element: TodoListNode;
}
export declare type TodoListKeyOption = 'todo_li';
export declare type TodoListPluginOptionsValues = RenderNodeOptions & RootProps<TodoListRenderElementPropsOptions> & NodeToProps<TodoListNode, TodoListRenderElementPropsOptions>;
export declare type TodoListPluginOptionsKeys = keyof TodoListPluginOptionsValues;
export declare type TodoListPluginOptions<Value extends TodoListPluginOptionsKeys = TodoListPluginOptionsKeys> = Partial<Record<TodoListKeyOption, Pick<TodoListPluginOptionsValues, Value>>>;
export declare type TodoListRenderElementOptionsKeys = TodoListPluginOptionsKeys;
export interface TodoListRenderElementOptions extends TodoListPluginOptions<TodoListRenderElementOptionsKeys> {
}
export interface TodoListDeserializeOptions extends TodoListPluginOptions<'type' | 'rootProps'> {
}
export interface WithTodoListOptions extends TodoListPluginOptions<'type'> {
}
export interface TodoListElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
    checkboxWrapper?: IStyle;
    checkbox?: IStyle;
    text?: IStyle;
}
export interface TodoListElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
    checked?: boolean;
}
//# sourceMappingURL=types.d.ts.map