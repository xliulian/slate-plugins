import { Editor } from 'slate';
import { WithAutoformatOptions } from './types';
/**
 * Enables support for autoformatting actions.
 * Once a markup rule is validated, it does not check the following rules.
 */
export declare const withAutoformat: ({ rules }: WithAutoformatOptions) => <T extends Editor>(editor: T) => T;
//# sourceMappingURL=withAutoformat.d.ts.map