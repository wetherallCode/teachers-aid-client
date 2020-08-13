import React, { FC, useMemo, useState, useEffect, useCallback } from 'react'
import { useCompletedEssayContextProvider } from './state/CompletedEssayContext'
import { useMutation } from '@apollo/client'
import { UPDATE_WORKING_DRAFT_MUTATION } from '../assigned-essays/EssayToComplete'
import {
  UpdateWorkingDraft,
  UpdateWorkingDraftVariables,
  findCompletedEssayById_findEssayById_essay,
} from '../../../../../../schemaTypes'
import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

export type RedoEssayEditorProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export const RedoEssayEditor: FC<RedoEssayEditorProps> = ({ essay }) => {
  const [state, event] = useCompletedEssayContextProvider()

  const editor = useMemo(() => withReact(createEditor()), [])
  const parsedEssay = JSON.parse(essay.workingDraft.draft)
  const [value, setValue] = useState(parsedEssay)
  const content = JSON.stringify(value)

  useEffect(() => {
    event({ type: 'SET_DRAFT', payload: content })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  const [updateWorkingDraft] = useMutation<
    UpdateWorkingDraft,
    UpdateWorkingDraftVariables
  >(UPDATE_WORKING_DRAFT_MUTATION, {
    variables: {
      input: { _id: essay._id!, updatedDraft: state.context.draftToUpdate },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
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
          renderLeaf={renderLeaf}
          autoFocus
          placeholder='Start with your topic statement....'
          onKeyDown={(e) => {
            updateWorkingDraft()
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
        {/* {value[0].children[0].text !== '' && (
          <SubmitEssay
            _id={state.context.essayId}
            submittedFinalDraft={submittedFinalDraft}
            isLate={state.context.isLate}
          />
        )} */}
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
