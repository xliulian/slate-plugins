import React from 'react';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { Editor, Path } from 'slate';
import { RenderElementProps } from 'slate-react';
import { SelectableStyleProps, SelectableStyles } from './Selectable.types';
export interface GetSelectabelElementOptions {
    component: any;
    styles?: IStyleFunctionOrObject<SelectableStyleProps, SelectableStyles>;
    level?: number;
    filter?: (editor: Editor, path: Path) => boolean;
    allowReadOnly?: boolean;
    dragIcon?: React.ReactNode;
}
export declare const getSelectableElement: ({ component: Component, styles, level, filter, allowReadOnly, dragIcon, }: GetSelectabelElementOptions) => React.ForwardRefExoticComponent<RenderElementProps & React.RefAttributes<unknown>>;
//# sourceMappingURL=getSelectableElement.d.ts.map