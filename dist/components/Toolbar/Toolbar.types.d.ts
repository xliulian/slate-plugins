import { IStyle } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
export interface ToolbarProps {
    /**
     * Additional class name to provide on the root element.
     */
    className?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ToolbarStyleProps, ToolbarStyles>;
    children?: any;
}
export interface ToolbarStyleProps {
    className?: string;
}
export interface ToolbarStyles {
    root: IStyle;
}
//# sourceMappingURL=Toolbar.types.d.ts.map