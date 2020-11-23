import React, { FC } from 'react'
import { useAssignEssayByCourseContextProvider } from './AssignEssayByCourseContext'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assignEssays,
  assignEssaysVariables,
} from '../../../../../../../schemaTypes'

export type AssignEssayProps = {}

export const ASSIGN_ESSAYS_MUTATION = gql`
  mutation assignEssays($input: AssignEssaysInput!) {
    assignEssays(input: $input) {
      essays {
        _id
      }
    }
  }
`

export const AssignEssay: FC<AssignEssayProps> = () => {
  const [state] = useAssignEssayByCourseContextProvider()
  const [assignEssays, { data, called }] = useMutation<
    assignEssays,
    assignEssaysVariables
  >(ASSIGN_ESSAYS_MUTATION, {
    variables: {
      input: {
        assignedDate: state.context.assignedDate,
        dueDate: state.context.dueDate,
        associatedLessonId: state.context.associatedLessonId,
        studentIds: state.context.studentIds,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  return (
    <>
      {data ? (
        <div>Finished</div>
      ) : (
        <button
          style={
            !called
              ? { backgroundColor: 'var(--blue)', color: 'var(--white)' }
              : { backgroundColor: 'var(--grey)', color: 'var(--blue)' }
          }
          onClick={() => {
            if (!called) {
              assignEssays()
            }
          }}
        >
          Assign
        </button>
      )}
    </>
  )
}
