import React, { useMemo, useState, useCallback, FC, useEffect } from 'react'
import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { UPDATE_WORKING_DRAFT_MUTATION } from './EssayToComplete'
import {
  findEssayById_findEssayById_essay,
  UpdateWorkingDraft,
  UpdateWorkingDraftVariables,
  SubmittedFinalDraftsInput,
} from '../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from './state-and-styles/StudentEssayContext'
import { useMutation } from '@apollo/client'
import { SubmitEssay } from './SubmitEssay'
import {
  EssayEditorContainer,
  EssayEditorBackgroundContainer,
  EssaySheet,
  SubmitEssayContainer,
  OrganizerControlButtonContainer,
} from './state-and-styles/assignedEssayStyles'

type StudentEssayEditorProps = {
  essay: findEssayById_findEssayById_essay
  submittedFinalDraft: SubmittedFinalDraftsInput
}

export type submittedFinalDraftType = {
  draft: string
  gradingDraft: string
  comments: string[]
  score: number
}

export const StudentEssayEditor: FC<StudentEssayEditorProps> = ({
  essay,
  submittedFinalDraft,
}) => {
  // console.log(essay.workingDraft.draft)
  const [state, event] = useStudentEssayContextProvider()

  const editor = useMemo(() => withReact(createEditor()), [])
  const parsedEssay = JSON.parse(essay.workingDraft.draft)
  const [value, setValue] = useState(parsedEssay)
  const content = JSON.stringify(value)
  console.log(content)
  // console.log(content === '' ? '' : content)
  // console.log(content === `[{"type":"paragraph","children":[{"text":""}]}]`)
  useEffect(() => {
    event({ type: 'SET_DRAFT', payload: content })
  }, [content])

  useEffect(() => {
    updateWorkingDraft()
  }, [state.context.draftToUpdate])

  const [updateWorkingDraft] = useMutation<
    UpdateWorkingDraft,
    UpdateWorkingDraftVariables
  >(UPDATE_WORKING_DRAFT_MUTATION, {
    variables: {
      input: {
        _id: state.context.essayId,
        updatedDraft: state.context.draftToUpdate,
      },
    },
    onCompleted: (data) =>
      console.log(data.updateWorkingDraft.essay.workingDraft),
    refetchQueries: ['findEssayById'],
  })

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
    <EssayEditorBackgroundContainer>
      <EssayEditorContainer>
        <EssaySheet>
          <Slate
            editor={editor}
            value={value as Node[]}
            onChange={(value: any) => {
              setValue(value as Node[])
            }}
          >
            <Editable
              renderElement={renderElement}
              spellCheck
              autoFocus={true}
              renderLeaf={renderLeaf}
              style={{
                // boxShadow: 'black',
                height: '98%',
              }}
              placeholder={`Let's get started...`}
              onKeyDown={(e) => {
                // e.preventDefault()
                event({ type: 'SET_DRAFT', payload: content })
                // updateWorkingDraft()
                // if (!e.ctrlKey) {
                // return
                // }
                // switch (e.key) {
                //   case '`': {
                //     e.preventDefault()
                //     const [match] = Editor.nodes(editor, {
                //       match: (n) => n.type === 'code',
                //     })
                //     Transforms.setNodes(
                //       editor,
                //       { type: match ? 'paragraph' : 'code' },
                //       { match: (n) => Editor.isBlock(editor, n) }
                //     )
                //     break
                //   }
                //   case 'b': {
                //     e.preventDefault()
                //     CustomEditor.toggleBoldMark(editor)
                //     break
                //   }
                //   case 's': {
                //     e.preventDefault()
                //     CustomEditor.toggleStrikeThrough(editor)
                //     break
                //   }
                //   case 'u': {
                //     e.preventDefault()
                //     CustomEditor.toggleUnderline(editor)
                //     break
                //   }
                // case '17': {
                //   e.preventDefault()
                // }
                // }
              }}
            />
          </Slate>
        </EssaySheet>
        <OrganizerControlButtonContainer>
          {value[0].children[0].text !== '' && (
            <SubmitEssay
              _id={state.context.essayId}
              submittedFinalDraft={submittedFinalDraft}
              essay={essay}
            />
          )}
        </OrganizerControlButtonContainer>
      </EssayEditorContainer>
    </EssayEditorBackgroundContainer>
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
  return (
    <p style={{ textIndent: '2%' }} {...props.attributes}>
      {props.children}
    </p>
  )
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
