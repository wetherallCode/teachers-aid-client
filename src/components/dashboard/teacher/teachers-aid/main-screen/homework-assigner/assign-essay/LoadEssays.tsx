import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findEssaysByAssociatedLessonIdForTodaysClass,
  findEssaysByAssociatedLessonIdForTodaysClassVariables,
} from '../../../../../../../schemaTypes'

import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'
import {
  AssignmentBlockContainer,
  TextStyle,
} from '../../../styles/mainScreenStyles'
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
        readings {
          readingPages
          readingSections
        }
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
    (essay) => essay.dueDate,
  )
  const studentIds = data?.findEssaysByAssociatedLessonId.essays.map(
    (essay) => essay.hasOwner._id,
  ) as string[]
  const finished = data?.findEssaysByAssociatedLessonId.essays
    .map((essay) => essay.assigned === true)
    .includes(true)!
  const assignmentTitle = data?.findEssaysByAssociatedLessonId.essays.map(
    (essay) => essay.readings,
  )!

  return (
    <AssignmentBlockContainer>
      {data?.findEssaysByAssociatedLessonId.essays.length! > 0 ? (
        <>
          <TextStyle>Assign Today's Essay</TextStyle>
          <br />
          <div>
            {assignmentTitle[0].readingPages}:{' '}
            {assignmentTitle[0].readingSections}
          </div>
          <br />
          <AssignEssaysForTeachersAid
            dueDate={dueDate! && dueDate![0]}
            studentIds={studentIds}
            finished={finished}
            loading={loading}
          />
        </>
      ) : (
        <>
          {loading ? (
            <div>Loading</div>
          ) : (
            <TextStyle>No Essay Assigned Today</TextStyle>
          )}
        </>
      )}
    </AssignmentBlockContainer>
  )
}
