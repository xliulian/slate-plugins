import { GetNodeDeserializerOptions, WithOptional } from './getNodeDeserializer';
export interface GetElementDeserializerOptions extends WithOptional<GetNodeDeserializerOptions, 'node'> {
    type: string;
}
/**
 * See {@link getNodeDeserializer}.
 */
export declare const getElementDeserializer: (options: GetElementDeserializerOptions) => import("@udecode/slate-plugins-core").DeserializeNode[];
//# sourceMappingURL=getElementDeserializer.d.ts.map