import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findLessonsByAssignedDateForQuizzableLessons,
  findLessonsByAssignedDateForQuizzableLessonsVariables,
} from '../../../../../schemaTypes'
import { useCreateQuizContextProvider } from './state-n-styles/CreateQuizContext'

export type FindAllQuizzableLessonsProps = {
  assignedDate: string
}

export const FIND_LESSONS_BY_DATE_QUERY = gql`
  query findLessonsByAssignedDateForQuizzableLessons(
    $input: FindLessonsByAssignedDateInput!
  ) {
    findLessonsByAssignedDate(input: $input) {
      lessons {
        assignedCourses {
          _id
        }
      }
    }
  }
`
export const FindAllQuizzableLessons = ({
  assignedDate,
}: FindAllQuizzableLessonsProps) => {
  const [state, event] = useCreateQuizContextProvider()
  const { loading, data } = useQuery<
    findLessonsByAssignedDateForQuizzableLessons,
    findLessonsByAssignedDateForQuizzableLessonsVariables
  >(FIND_LESSONS_BY_DATE_QUERY, {
    variables: {
      input: { assignedDate: assignedDate },
    },
    onCompleted: (data) => {
      const courseIds = data?.findLessonsByAssignedDate.lessons?.map(
        (lesson) => lesson.assignedCourses[0]._id,
      ) as string[]
      event({
        type: 'SET_QUIZ_INPUTS',
        keyName: 'courseIds',
        payload: courseIds,
      })
    },
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>
  return null
}
