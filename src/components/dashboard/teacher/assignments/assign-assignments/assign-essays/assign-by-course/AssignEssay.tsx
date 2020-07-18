import React, { FC } from 'react'
import { useAssignEssayByCourseContextProvider } from './AssignEssayByCourseContext'
import { gql, useMutation } from '@apollo/client'
import {
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
  const [state, event] = useAssignEssayByCourseContextProvider()
  const [assignEssays] = useMutation<assignEssays, assignEssaysVariables>(
    ASSIGN_ESSAYS_MUTATION,
    {
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
    }
  )
  return (
    <>
      <button onClick={() => assignEssays()}>Assign</button>
    </>
  )
}
