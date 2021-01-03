import { Editor } from 'slate';
export interface MarkEditor extends Editor {
    removeMark: (key: string, shouldChange?: boolean) => void;
}
export declare const withMarks: () => <T extends Editor>(editor: T) => T & MarkEditor;
//# sourceMappingURL=withMarks.d.ts.map