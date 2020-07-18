import React, { FC, Dispatch, SetStateAction } from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'
import { gql, useMutation } from '@apollo/client'
import { EditEntry } from './EditEntry'
import { EditScore } from './EditScore'
import { EditSection } from './EditSection'
import { EditWritingLevel } from './EditWritingLevel'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRubricEntry,
  updateRubricEntryVariables,
} from '../../../../../../schemaTypes'
import { Modal } from '../../../../../../animations'
import { DeleteEntry } from '../delete/DeleteEntry'
import { EditHowToImprove } from './EditHowToImprove'

export type RubricEditorDisplayProps = {
  deleteEntry: boolean
  setDeleteEntry: Dispatch<SetStateAction<boolean>>
}

export const UPDATE_RUBRIC_ENTRY_MUTATION = gql`
  mutation updateRubricEntry($input: UpdateRubricEntryInput!) {
    updateRubricEntry(input: $input) {
      rubricEntry {
        _id
        entry
        score
        rubricSection
        rubricWritingLevels
      }
    }
  }
`

export const RubricEditorDisplay: FC<RubricEditorDisplayProps> = ({
  deleteEntry,
  setDeleteEntry,
}) => {
  const [state, event] = useRubricEditorContextProvider()

  const [updateRubricEntry] = useMutation<
    updateRubricEntry,
    updateRubricEntryVariables
  >(UPDATE_RUBRIC_ENTRY_MUTATION, {
    variables: {
      input: {
        rubricEntryId: state.context.editableRubricEntry.rubricEntryId!,
        entry: state.context.editableRubricEntry.entry,
        rubricSection: state.context.editableRubricEntry.rubricSection,
        rubricWritingLevels:
          state.context.editableRubricEntry.rubricWritingLevels,
        score: state.context.editableRubricEntry.score,
        howToImprove: state.context.editableRubricEntry.howToImprove!,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findRubricEntries'],
  })
  return (
    <>
      <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
      <div>{state.context.selectedRubricEntry.entry}</div>
      <EditEntry />
      <EditScore />
      <EditSection />
      <EditWritingLevel />
      <EditHowToImprove />
      <button
        onClick={() => {
          updateRubricEntry()
          event({ type: 'PREVIOUS' })
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          setDeleteEntry(true)
        }}
      >
        Delete
      </button>

      <Modal isToggled={deleteEntry} setIsToggled={setDeleteEntry}>
        <DeleteEntry setIsToggled={setDeleteEntry} />
      </Modal>
    </>
  )
}
