import * as React from 'react';
import { SlateProps } from '../types/Slate.types';
/**
 * Create a React element wrapped in a Slate provider.
 * By default, it will use an empty editor.
 * TODO: allow other providers
 */
export declare const createElementWithSlate: (slateProps?: Partial<SlateProps> | undefined) => React.FunctionComponentElement<{
    [key: string]: unknown;
    editor: import("slate-react").ReactEditor;
    value: import("slate").Node[];
    children: React.ReactNode;
    onChange: (value: import("slate").Node[]) => void;
}>;
//# sourceMappingURL=createElementWithSlate.d.ts.map