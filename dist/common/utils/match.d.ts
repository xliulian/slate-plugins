import { Editor } from 'slate';
export declare type PredicateObj<T> = Partial<Record<keyof T, any | any[]>>;
export declare type PredicateFn<T> = (obj: T) => boolean;
export declare type Predicate<T> = PredicateObj<T> | PredicateFn<T>;
/**
 * Match the object with a predicate object or function.
 * If predicate is:
 * - object: every predicate key/value should be in obj.
 * - function: it should return true.
 */
export declare const match: <T>(obj: T, predicate?: Partial<Record<keyof T, any>> | PredicateFn<T> | undefined) => boolean;
export declare const matchPredicate: <T>(predicate?: Partial<Record<keyof T, any>> | PredicateFn<T> | undefined) => (obj: T) => boolean;
/**
 * Extended query options for slate queries:
 * - `match` can be an object predicate where one of the values should include the node value.
 * Example: { type: ['1', '2'] } will match the nodes having one of these 2 types.
 */
export declare const getQueryOptions: <T>(editor: Editor, options: any) => any;
//# sourceMappingURL=match.d.ts.map