/// <reference types="react" />
import { NodeToProps, RenderElementPropsWithAttributes, RenderNodeOptions } from '../types/PluginOptions.types';
export interface GetRenderElementOptions extends Required<RenderNodeOptions>, NodeToProps<any, any> {
}
/**
 * Get a `renderElement` handler for a single type.
 * If the given `type` is equals to the slate element type, render the given `component`.
 * You can pass props by using `rootProps`. Falsy props are ignored.
 */
export declare const getRenderElement: ({ type, component: Component, rootProps, nodeToProps, }: GetRenderElementOptions) => ({ attributes, element, children, }: RenderElementPropsWithAttributes) => JSX.Element | undefined;
/**
 * Get a `renderElement` handler for multiple types.
 */
export declare const getRenderElements: (options: GetRenderElementOptions[]) => ({ attributes, element, children, }: RenderElementPropsWithAttributes) => JSX.Element | undefined;
//# sourceMappingURL=getRenderElement.d.ts.map