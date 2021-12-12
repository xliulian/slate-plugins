import { GetNodeDeserializerOptions, WithOptional } from './getNodeDeserializer';
export interface GetLeafDeserializerOptions extends WithOptional<Omit<GetNodeDeserializerOptions, 'withoutChildren'>, 'node'> {
    type: string;
}
/**
 * See {@link getNodeDeserializer}.
 */
export declare const getLeafDeserializer: (options: GetLeafDeserializerOptions) => import("@udecode/slate-plugins-core").DeserializeNode[];
//# sourceMappingURL=getLeafDeserializer.d.ts.map