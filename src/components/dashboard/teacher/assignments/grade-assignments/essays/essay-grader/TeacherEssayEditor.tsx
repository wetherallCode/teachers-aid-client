import React, { useMemo, useState, useCallback, FC, useEffect } from 'react'
import { createEditor, Transforms, Editor, Node } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  useFocused,
  useSelected,
  useSlate,
} from 'slate-react'
import { CustomEditor } from '../../../../../../editor/CustomEditor'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateGradingDraft,
  updateGradingDraftVariables,
} from '../../../../../../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { useGradeEssayContextProvider } from './GradeEssayContext'
import {
  DraftName,
  EssayToGradeContainer,
} from './essay-grader-styles/EssaysToGradeStyles'

export type TeacherEssayEditorProps = {}

export const UPDATE_GRADING_DRAFT_MUTATION = gql`
  mutation updateGradingDraft($input: UpdateGradingDraftInput!) {
    updateGradingDraft(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const TeacherEssayEditor: FC<TeacherEssayEditorProps> = () => {
  const [state] = useGradeEssayContextProvider()
  const [commentNumber, setCommentNumber] = useState([])

  const editor = useMemo(() => withReact(createEditor()), [])
  // const parsedGradingDraft = JSON.parse(
  //   essay.finalDraft?.submittedFinalDraft[
  //     state.context.draftToGrade.draftNumber
  //   ].gradingDraft
  // )
  const parsedGradingDraft = JSON.parse(state.context.draftToGrade.gradingDraft)
  const [value, setValue] = useState(parsedGradingDraft)
  useEffect(() => {
    setValue(parsedGradingDraft)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.draftToGrade.gradingDraft])
  const content = JSON.stringify(value)

  // useEffect(() => {
  //   event({ type: 'SET_DRAFT_TO_RETURN', payload: content })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [content])

  const [updateGradingDraft] = useMutation<
    updateGradingDraft,
    updateGradingDraftVariables
  >(UPDATE_GRADING_DRAFT_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId!,
        gradingDraft: content,
        draftNumber:
          // essay.finalDraft?.submittedFinalDraft[
          //   state.context.draftToGrade.draftNumber
          // ].draftNumber,
          state.context.draftToGrade.draftNumber,
      },
    },
    // onCompleted: (data) => console.log(data),
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
    return <Leaf {...props} setCommentNumber={setCommentNumber} />
  }, [])

  return (
    <EssayToGradeContainer>
      <DraftName>Draft To Grade</DraftName>
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
          style={{ color: `var(--${state.context.editColor})` }}
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
              case 'c': {
                e.preventDefault()
                CustomEditor.toggleUnderline(editor)
                break
              }
              // case 'r': {
              //   e.preventDefault()
              //   CustomEditor.toggleRedPen(editor)
              //   break
              // }
            }
          }}
        />
      </Slate>
    </EssayToGradeContainer>
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

export const Leaf = ({ setCommentNumber, ...props }: any) => {
  const [state] = useGradeEssayContextProvider()
  // console.log(props)
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        color: props.leaf.strikeThrough
          ? 'var(--red)'
          : props.leaf.underline
          ? 'gray'
          : 'var(--blue)',
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

export function withMyPlugin(editor: Editor) {
  const { insertNode } = editor

  return editor
}
