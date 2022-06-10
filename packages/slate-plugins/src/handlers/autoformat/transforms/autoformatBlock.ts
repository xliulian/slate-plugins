import { Editor, Location, Transforms } from 'slate';

export const autoformatBlock = (
  editor: Editor,
  type: string,
  at: Location,
  {
    preFormat,
    format,
  }: {
    preFormat?: (editor: Editor) => void;
    format?: (editor: Editor) => void;
  }
) => {
  const selectionRef = Editor.rangeRef(editor, editor.selection!)
  Transforms.delete(editor, { at });
  if (!selectionRef.current) {
    // XXX: we lost selection during this delete, but current selection is before the deleted node.
    const nextPosition = Editor.after(editor, editor.selection!.anchor)
    Transforms.select(editor, nextPosition!)
  } else {
    selectionRef.unref()
  }

  preFormat?.(editor);

  if (!format) {
    Transforms.setNodes(
      editor,
      { type },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  } else {
    format(editor);
  }
};
