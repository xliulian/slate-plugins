import { TableOptions } from '../types';
export declare const getEmptyCellNode: (options?: (TableOptions & Partial<Record<"p", Pick<import("../../paragraph").ParagraphPluginOptionsValues, "type" | "component" | "rootProps" | "hotkey" | "defaultType" | "nodeToProps" | "deserialize">>> & {
    header?: boolean | undefined;
}) | undefined) => {
    type: string;
    children: {
        type: string;
        children: {
            text: string;
        }[];
    }[];
};
//# sourceMappingURL=getEmptyCellNode.d.ts.map