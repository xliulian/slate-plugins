import { ReactEditor } from 'slate-react';
/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 * @param img.type
 */
export declare const withImageUpload: (options?: Partial<Record<"img", Pick<import("../types").ImagePluginOptionsValues, "type">>> | undefined) => <T extends ReactEditor>(editor: T) => T;
//# sourceMappingURL=withImageUpload.d.ts.map