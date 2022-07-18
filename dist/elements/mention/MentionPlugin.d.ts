import { SlatePlugin } from '@udecode/slate-plugins-core';
/**
 * Enables support for autocompleting @mentions and #tags.
 * When typing a configurable marker, such as @ or #, a select
 * component appears with autocompleted suggestions.
 */
export declare const MentionPlugin: (options?: Partial<Record<"mention", Pick<import("./types").MentionPluginOptionsValues, "type" | "component" | "rootProps" | "hotkey" | "defaultType" | "nodeToProps" | "deserialize">>> | undefined) => SlatePlugin;
//# sourceMappingURL=MentionPlugin.d.ts.map