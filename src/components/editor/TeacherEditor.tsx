import React, { useMemo, useState, useCallback, FC } from 'react'
import { createEditor, Transforms, Editor, Node, Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { CustomEditor } from './CustomEditor'

export const TeacherEditor: FC<any> = ({ essay }) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const parsedElement = JSON.parse(essay.workingDraft.draft)
  const [value, setValue] = useState(parsedElement)

  const content = JSON.stringify(value)

  //   const [updateWorkingDraft] = useMutation<
  //     UpdateWorkingDraft,
  //     UpdateWorkingDraftVariables
  //   >(UPDATE_WORKING_DRAFT_MUTATION, {
  //     variables: { input: { _id: essay._id, updatedDraft: content } },
  //     refetchQueries: ['findEssayByIdForDraftEditor'],
  //   })

  const submittedFinalDraft = {
    draft: JSON.stringify(value),
    gradingDraft: JSON.stringify(value),
    comments: [],
    score: 0,
  }

  const submittedTime = new Date().toLocaleString().substring(0, 9)

  const isLate = submittedTime > essay.dueDate

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  return (
    <>
      <Slate
        editor={editor}
        value={value as Node[]}
        onChange={(value) => {
          setValue(value as Node[])
        }}
      >
        <Editable
          renderElement={renderElement}
          spellCheck
          onCopy={() => false}
          renderLeaf={renderLeaf}
          autoFocus
          placeholder='Start by indenting the topic statement....'
          onKeyDown={(e) => {
            // updateWorkingDraft()

            if (!e.ctrlKey) {
              return
            }
            switch (e.key) {
              case '`': {
                e.preventDefault()
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.type === 'code',
                })
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'code' },
                  { match: (n) => Editor.isBlock(editor, n) }
                )
                break
              }
              case 'b': {
                e.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
              case 's': {
                e.preventDefault()
                CustomEditor.toggleStrikeThrough(editor)
                break
              }
              case 'u': {
                e.preventDefault()
                CustomEditor.toggleUnderline(editor)
                break
              }
            }
          }}
        />
      </Slate>
      {/* <SubmitAssignment
        _id={essay._id}
        submittedFinalDraft={submittedFinalDraft}
        late={isLate}
      /> */}
    </>
  )
}
const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}
const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}

export const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        textDecoration: props.leaf.strikeThrough
          ? 'line-through'
          : props.leaf.underline
          ? 'underline'
          : 'none',
      }}
    >
      {props.children}
    </span>
  )
}
