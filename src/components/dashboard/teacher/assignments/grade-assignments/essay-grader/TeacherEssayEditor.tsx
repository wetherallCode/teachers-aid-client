import React, { useMemo, useState, useCallback, FC, useEffect } from 'react'
import { createEditor, Transforms, Editor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { CustomEditor } from '../../../../../editor/CustomEditor'
import {
  findEssayToGradeById_findEssayById_essay,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateGradingDraft,
  updateGradingDraftVariables,
} from '../../../../../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { useGradeEssayContextProvider } from './GradeEssayContext'

export type TeacherEssayEditorProps = {
  essay: findEssayToGradeById_findEssayById_essay
}

export const UPDATE_GRADING_DRAFT_MUTATION = gql`
  mutation updateGradingDraft($input: UpdateGradingDraftInput!) {
    updateGradingDraft(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const TeacherEssayEditor: FC<TeacherEssayEditorProps> = ({ essay }) => {
  const [state, event] = useGradeEssayContextProvider()
  const editor = useMemo(() => withReact(createEditor()), [])
  const parsedElement = JSON.parse(
    essay.finalDraft?.submittedFinalDraft.gradingDraft
  )
  const [value, setValue] = useState(parsedElement)
  const content = JSON.stringify(value)

  useEffect(() => {
    console.log(content)
    event({ type: 'SET_DRAFT_TO_RETURN', payload: content })
  }, [content])

  const [updateGradingDraft] = useMutation<
    updateGradingDraft,
    updateGradingDraftVariables
  >(UPDATE_GRADING_DRAFT_MUTATION, {
    variables: {
      input: {
        essayId: essay._id!,
        gradingDraft: content,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayToGradeById'],
  })

  useEffect(() => {
    updateGradingDraft()
  }, [updateGradingDraft, content])

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
