import React, { FC, Dispatch, SetStateAction } from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeRubricEntry,
  removeRubricEntryVariables,
} from '../../../../../../schemaTypes'

export type DeleteEntryProps = {
  setIsToggled: Dispatch<SetStateAction<boolean>>
}

export const REMOVE_RUBRIC_ENTRY_MUTATION = gql`
  mutation removeRubricEntry($input: RemoveRubricEntryInput!) {
    removeRubricEntry(input: $input) {
      removed
    }
  }
`

export const DeleteEntry: FC<DeleteEntryProps> = ({ setIsToggled }) => {
  const [state, event] = useRubricEditorContextProvider()
  const [removeRubricEntry] = useMutation<
    removeRubricEntry,
    removeRubricEntryVariables
  >(REMOVE_RUBRIC_ENTRY_MUTATION, {
    variables: {
      input: { rubricEntryId: state.context.selectedRubricEntry._id! },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findRubricEntries'],
  })
  return (
    <>
      <button onClick={() => setIsToggled(false)}>Don't Delete</button>
      <button
        onClick={() => {
          removeRubricEntry()
          event({ type: 'PREVIOUS' })
        }}
      >
        Delete
      </button>
    </>
  )
}
