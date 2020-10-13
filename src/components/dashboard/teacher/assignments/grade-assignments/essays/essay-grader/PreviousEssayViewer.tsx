import React, { useMemo, useState, useCallback, FC, useEffect } from 'react'
import { createEditor, Transforms, Editor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
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
  PreviousEssayContainer,
} from './essay-grader-styles/EssaysToGradeStyles'

export type PreviousEssayViewerProps = {}

// export const UPDATE_GRADING_DRAFT_MUTATION = gql`
//   mutation updateGradingDraft($input: UpdateGradingDraftInput!) {
//     updateGradingDraft(input: $input) {
//       essay {
//         _id
//       }
//     }
//   }
// `

export const PreviousEssayViewer: FC<PreviousEssayViewerProps> = () => {
  const [state] = useGradeEssayContextProvider()

  const editor = useMemo(() => withReact(createEditor()), [])
  // const parsedGradingDraft = JSON.parse(
  //   essay.finalDraft?.submittedFinalDraft[
  //     state.context.draftToGrade.draftNumber
  //   ].gradingDraft
  // )
  console.log(state.context.previousDraft.gradingDraft)
  const parsedGradingDraft = JSON.parse(
    state.context.previousDraft.gradingDraft
  )
  const [value, setValue] = useState(parsedGradingDraft)
  useEffect(() => {
    setValue(parsedGradingDraft)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.previousDraft.gradingDraft])
  const content = JSON.stringify(value)

  // useEffect(() => {
  //   event({ type: 'SET_DRAFT_TO_RETURN', payload: content })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [content])

  //   const [updateGradingDraft] = useMutation<
  //     updateGradingDraft,
  //     updateGradingDraftVariables
  //   >(UPDATE_GRADING_DRAFT_MUTATION, {
  //     variables: {
  //       input: {
  //         essayId: state.context.essayId!,
  //         gradingDraft: content,
  //         draftNumber:
  //           // essay.finalDraft?.submittedFinalDraft[
  //           //   state.context.draftToGrade.draftNumber
  //           // ].draftNumber,
  //           state.context.draftToGrade.draftNumber,
  //       },
  //     },
  //     onCompleted: (data) => console.log(data),
  //     refetchQueries: ['findEssayToGradeById'],
  //   })

  //   useEffect(() => {
  //     // updateGradingDraft()
  //   }, [updateGradingDraft, content])

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
    <PreviousEssayContainer>
      <DraftName>
        Draft {Number(state.context.previousDraft.draftNumber) + 1}
      </DraftName>
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
    </PreviousEssayContainer>
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
