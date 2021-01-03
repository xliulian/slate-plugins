import { DeserializeNode } from '@udecode/slate-plugins-core';
export declare type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export interface GetNodeDeserializerRule {
    /**
     * Required node names to deserialize the element.
     * Set '*' to allow any node name.
     */
    nodeNames?: string | string[];
    /**
     * Required className to deserialized the element.
     */
    className?: string;
    /**
     * Required style to deserialize the element. Each value should be a (list of) string.
     */
    style?: Partial<Record<keyof CSSStyleDeclaration, string | string[] | undefined>>;
    /**
     * Required attribute name or name + value
     */
    attribute?: string | {
        [key: string]: string | string[];
    };
}
export interface GetNodeDeserializerOptions {
    type: string;
    /**
     * Slate node creator from HTML element.
     */
    node: (el: HTMLElement) => {
        [key: string]: any;
    } | undefined;
    /**
     * List of html attributes to store with the node
     */
    attributes?: string[];
    /**
     * List of rules the element needs to follow to be deserialized to a slate node.
     */
    rules: GetNodeDeserializerRule[];
    /**
     * Whether or not to include deserialized children on this node
     */
    withoutChildren?: boolean;
}
/**
 * Get a deserializer by type, node names, class names and styles.
 */
export declare const getNodeDeserializer: ({ type, node, attributes, rules, withoutChildren, }: GetNodeDeserializerOptions) => DeserializeNode[];
//# sourceMappingURL=getNodeDeserializer.d.ts.map