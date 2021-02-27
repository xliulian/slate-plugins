import { SlatePlugin } from '@udecode/slate-plugins-core';
import { Editor } from 'slate';
export interface WithInlineVoidOptions {
    plugins?: SlatePlugin[];
    inlineTypes?: string[];
    voidTypes?: string[];
}
export declare const withInlineVoid: ({ plugins, inlineTypes, voidTypes, }: WithInlineVoidOptions) => <T extends Editor>(editor: T) => T;
//# sourceMappingURL=withInlineVoid.d.ts.map