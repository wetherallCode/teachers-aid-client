import { Transforms, Editor, Text } from 'slate'

export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    })
    return !!match
  },
  isStrkeThroughMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.strikeThrough === true,
      universal: true,
    })
    return !!match
  },
  isUnderlineActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline === true,
      universal: true,
    })
    return !!match
  },
  isRedPenActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.redPen === true,
      universal: true,
    })
    return !!match
  },
  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    )
  },
  toggleStrikeThrough(editor: Editor) {
    const isActive = CustomEditor.isStrkeThroughMarkActive(editor)
    Transforms.setNodes(
      editor,
      { strikeThrough: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    )
  },
  toggleUnderline(editor: Editor) {
    const isActive = CustomEditor.isUnderlineActive(editor)
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    )
  },
  // toggleRedPen(editor: Editor, nodes: Node) {
  //   const isActive = CustomEditor.isRedPenActive(editor)
  //   Transforms.insertNodes(editor)
  // },
}
