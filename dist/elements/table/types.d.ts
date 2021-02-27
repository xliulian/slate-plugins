import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { RenderElementProps } from 'slate-react';
import { Deserialize, ElementWithAttributes, HtmlAttributesProps, NodeToProps, RenderNodeOptions, RenderNodePropsOptions, RootProps } from '../../common/types/PluginOptions.types';
export declare const TableHotKey: {
    TAB: string;
};
export interface TableNodeData {
}
export interface TableNode extends ElementWithAttributes, TableNodeData {
}
export interface TableRenderElementPropsOptions {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<TableElementStyleProps, TableElementStyles>;
}
export interface TableElementProps extends RenderElementProps, RenderNodePropsOptions, HtmlAttributesProps, TableRenderElementPropsOptions {
    element: TableNode;
}
export declare type TableKeyOption = 'table' | 'th' | 'tr' | 'td';
export declare type TablePluginOptionsValues = RenderNodeOptions & RootProps<TableRenderElementPropsOptions> & NodeToProps<TableNode, TableRenderElementPropsOptions> & Deserialize;
export declare type TablePluginOptionsKeys = keyof TablePluginOptionsValues;
export declare type TablePluginOptions<Value extends TablePluginOptionsKeys = TablePluginOptionsKeys> = Partial<Record<TableKeyOption, Pick<TablePluginOptionsValues, Value>>>;
export declare type TableRenderElementOptionsKeys = TablePluginOptionsKeys;
export interface TableRenderElementOptions extends TablePluginOptions<TableRenderElementOptionsKeys> {
}
export interface TableDeserializeOptions extends TablePluginOptions<'type' | 'rootProps' | 'deserialize'> {
}
export interface TableOnKeyDownOptions extends TablePluginOptions<'type'> {
}
export interface TableOptions extends TablePluginOptions<'type'> {
}
export interface WithTableOptions extends TablePluginOptions<'type'> {
}
export interface TableElementStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
}
export interface TableElementStyleProps {
    /**
     * Accept custom classNames
     */
    className?: string;
}
//# sourceMappingURL=types.d.ts.map