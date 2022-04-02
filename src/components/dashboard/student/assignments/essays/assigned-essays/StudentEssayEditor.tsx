import React, {
  useMemo,
  useState,
  useCallback,
  FC,
  useEffect,
  SyntheticEvent,
} from 'react'
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
  OrganizerControlButtonContainer,
  EssayOrganizerSheet,
} from './state-and-styles/assignedEssayStyles'
import { EssayOrganizer } from './essay-info/essay-organizers/EssayOrganizer'

type StudentEssayEditorProps = {
  essay: findEssayById_findEssayById_essay
  submittedFinalDraft: SubmittedFinalDraftsInput
  grade: number
}

export type submittedFinalDraftType = {
  draft: string
  gradingDraft: string
  comments: string[]
  score: number
}

export const StudentEssayEditor = ({
  essay,
  submittedFinalDraft,
  grade,
}: StudentEssayEditorProps) => {
  const [state, event] = useStudentEssayContextProvider()
  const editor = useMemo(() => withReact(createEditor()), [])
  const parsedEssay = JSON.parse(essay.workingDraft.draft)
  const [value, setValue] = useState(parsedEssay)
  const content = JSON.stringify(value)

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
        <EssayOrganizerSheet>
          <EssayOrganizer organizer={essay.workingDraft.organizer!} />
        </EssayOrganizerSheet>
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
                height: '98%',
                marginLeft: '3%',
                marginRight: '3%',
              }}
              onPaste={(e: SyntheticEvent) => {
                e.preventDefault()
              }}
              placeholder={`Your essay goes here; your first sentence is the restatement.`}
              onKeyDown={(e) => {
                // e.preventDefault()
                // if (e.key === 'Enter') return null
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
      </EssayEditorContainer>
      <OrganizerControlButtonContainer>
        <SubmitEssay
          _id={state.context.essayId}
          submittedFinalDraft={submittedFinalDraft}
          response={value[0].children[0].text !== ''}
          grade={grade}
        />
      </OrganizerControlButtonContainer>
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
