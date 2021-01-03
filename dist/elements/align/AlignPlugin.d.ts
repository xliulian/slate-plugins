/// <reference types="react" />
/**
 * Enables support for text alignment, useful to align your content
 * to left, right and center it.
 */
export declare const AlignPlugin: (options?: Partial<Record<import("./types").AlignKeyOption, Pick<import("./types").AlignPluginOptionsValues, "type" | "component" | "rootProps" | "hotkey" | "defaultType" | "nodeToProps" | "deserialize">>> | undefined) => {
    renderElement: ({ attributes, element, children, }: import("../..").RenderElementPropsWithAttributes) => JSX.Element | undefined;
    deserialize: import("@udecode/slate-plugins-core").DeserializeHtml;
};
//# sourceMappingURL=AlignPlugin.d.ts.map