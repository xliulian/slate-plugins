/// <reference types="react" />
import { RenderElementProps } from 'slate-react';
import { HeadingRenderElementOptions } from './types';
/**
 * Font sizes are relative to the base font size
 * H1 - fs * 20/11
 * H2 - fs * 16/11
 * H3 - fs * 14/11
 * H4 - fs * 12/11
 * H5 - fs * 1
 * H6 - fs * 1
 */
export declare const renderElementHeading: (options?: HeadingRenderElementOptions | undefined) => (props: RenderElementProps) => JSX.Element | undefined;
//# sourceMappingURL=renderElementHeading.d.ts.map