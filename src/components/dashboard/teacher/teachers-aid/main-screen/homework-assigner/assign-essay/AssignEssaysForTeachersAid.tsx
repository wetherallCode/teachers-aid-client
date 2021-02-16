import { gql, useMutation } from '@apollo/client'
import React, { FC, useState } from 'react'
import {
  assignEssayInTeachersAid,
  assignEssayInTeachersAidVariables,
} from '../../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'

export type AssignEssaysForTeachersAidProps = {
  dueDate: string
  studentIds: string[]
  finished: boolean
}
export const ASSIGN_ESSAYS_MUTATION = gql`
  mutation assignEssayInTeachersAid($input: AssignEssaysInput!) {
    assignEssays(input: $input) {
      essays {
        _id
      }
    }
  }
`
export const AssignEssaysForTeachersAid: FC<AssignEssaysForTeachersAidProps> = ({
  studentIds,
  dueDate,
  finished,
}) => {
  const [state] = useTeachersAidContextProvider()

  const [assignEssays, { called, data }] = useMutation<
    assignEssayInTeachersAid,
    assignEssayInTeachersAidVariables
  >(ASSIGN_ESSAYS_MUTATION, {
    variables: {
      input: {
        dueDate,
        assignedDate: new Date().toLocaleDateString(),
        associatedLessonId: state.context.associatedLessonId,
        studentIds: studentIds,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssaysByAssociatedLessonIdForTodaysClass'],
  })

  return (
    <>
      {data || finished ? (
        <div>Finished</div>
      ) : (
        <button
          style={
            !called
              ? { backgroundColor: 'var(--blue)', color: 'var(--white)' }
              : { backgroundColor: 'var(--grey)', color: 'var(--blue)' }
          }
          onClick={() => assignEssays()}
        >
          Assign
        </button>
      )}
    </>
  )
}
