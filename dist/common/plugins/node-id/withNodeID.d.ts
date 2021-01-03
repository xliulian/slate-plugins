import { HistoryEditor } from 'slate-history';
import { QueryOptions } from '../../types/QueryOptions.types';
export interface WithNodeIDProps extends QueryOptions {
    idKey?: string;
    idCreator?: Function;
    filterText?: boolean;
    resetExistingID?: boolean;
}
/**
 * Enables support for inserting nodes with an id key.
 */
export declare const withNodeID: ({ idKey, idCreator, filterText, resetExistingID, filter, allow, exclude, }?: WithNodeIDProps) => <T extends HistoryEditor>(e: T) => T & {
    removedIDs: Set<any>;
};
//# sourceMappingURL=withNodeID.d.ts.map