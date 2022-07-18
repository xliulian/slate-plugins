import { DeepRequired } from 'utility-types';
/**
 * Deep merge the default object properties that are not defined in the destination object.
 * @param object  The destination object.
 * @param defaultObject   The default object.
 */
export declare const setDefaults: <T, U>(object: T, defaultObject: U) => DeepRequired<T & U>;
//# sourceMappingURL=setDefaults.d.ts.map