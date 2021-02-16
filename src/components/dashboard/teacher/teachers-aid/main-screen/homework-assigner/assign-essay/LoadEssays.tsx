import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findEssaysByAssociatedLessonIdForTodaysClass,
  findEssaysByAssociatedLessonIdForTodaysClassVariables,
} from '../../../../../../../schemaTypes'

import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'
import { AssignEssaysForTeachersAid } from './AssignEssaysForTeachersAid'

export type LoadEssaysProps = {}

export const FIND_ESSAY_FOR_TODAYS_CLASS_QUERY = gql`
  query findEssaysByAssociatedLessonIdForTodaysClass(
    $input: FindEssaysByAssociatedLessonIdInput!
  ) {
    findEssaysByAssociatedLessonId(input: $input) {
      essays {
        _id
        hasOwner {
          _id
        }
        dueDate
        assigned
      }
    }
  }
`

export const LoadEssays: FC<LoadEssaysProps> = () => {
  const [state] = useTeachersAidContextProvider()

  const { loading, data } = useQuery<
    findEssaysByAssociatedLessonIdForTodaysClass,
    findEssaysByAssociatedLessonIdForTodaysClassVariables
  >(FIND_ESSAY_FOR_TODAYS_CLASS_QUERY, {
    variables: {
      input: { associatedLessonId: state.context.associatedLessonId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const dueDate = data?.findEssaysByAssociatedLessonId.essays!.map(
    (essay) => essay.dueDate
  )
  const studentIds = data?.findEssaysByAssociatedLessonId.essays.map(
    (essay) => essay.hasOwner._id
  ) as string[]
  const finished = data?.findEssaysByAssociatedLessonId.essays
    .map((essay) => essay.assigned === true)
    .includes(true)!

  return (
    <>
      <div>Assign Today's Essay</div>
      <AssignEssaysForTeachersAid
        dueDate={dueDate! && dueDate![0]}
        studentIds={studentIds}
        finished={finished}
      />
    </>
  )
}
