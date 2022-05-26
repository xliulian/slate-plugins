import { ReactEditor } from 'slate-react';
import { WithLinkOptions } from './types';
/**
 * Insert space after a url to wrap a link.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a link element will edit its children text but not its url.
 *
 */
export declare const withLink: (options?: WithLinkOptions | undefined) => <T extends ReactEditor>(editor: T) => T;
//# sourceMappingURL=withLink.d.ts.map