import { Node, Path, Point, Range, Span } from 'slate';
export interface EditorNodesOptions {
    at?: Range | Path | Point | Span;
    match?: (node: Node) => boolean;
    mode?: 'highest' | 'lowest' | 'all';
    universal?: boolean;
    reverse?: boolean;
    voids?: boolean;
}
export interface EditorAboveOptions {
    at?: Range | Path | Point;
    match?: (node: Node) => boolean;
    mode?: 'highest' | 'lowest';
    voids?: boolean;
}
export interface EditorParentOptions {
    depth?: number | undefined;
    edge?: 'start' | 'end' | undefined;
}
//# sourceMappingURL=Editor.types.d.ts.map