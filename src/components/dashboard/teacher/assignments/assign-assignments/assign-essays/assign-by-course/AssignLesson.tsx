import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findEssaysByAssociatedLessonIdAndCourseId,
  findEssaysByAssociatedLessonIdAndCourseIdVariables,
} from '../../../../../../../schemaTypes'
import { AssignEssay } from './AssignEssay'
import { useAssignEssayByCourseContextProvider } from './AssignEssayByCourseContext'
import { todaysLocaleDate } from '../../../../../../../utils'

export type AssignLessonProps = {
  lessonId: string
  courseId: string
}

export const FIND_ESSAYS_BY_LESSON_AND_COURSE_QUERY = gql`
  query findEssaysByAssociatedLessonIdAndCourseId(
    $input: FindEssaysByAssociatedLessonIdAndCourseIdInput!
  ) {
    findEssaysByAssociatedLessonIdAndCourseId(input: $input) {
      essays {
        assigned
        hasOwner {
          _id
          firstName
          lastName
        }
        readings {
          readingSections
        }
        dueDate
        assignedDate
      }
    }
  }
`

export const AssignLesson: FC<AssignLessonProps> = ({ lessonId, courseId }) => {
  const [state, event] = useAssignEssayByCourseContextProvider()

  const { loading, data } = useQuery<
    findEssaysByAssociatedLessonIdAndCourseId,
    findEssaysByAssociatedLessonIdAndCourseIdVariables
  >(FIND_ESSAYS_BY_LESSON_AND_COURSE_QUERY, {
    variables: {
      input: { courseId, lessonId },
    },
    onCompleted: (data) => {
      if (data.findEssaysByAssociatedLessonIdAndCourseId.essays.length > 0) {
        const studentIds: string[] =
          data.findEssaysByAssociatedLessonIdAndCourseId.essays.map(
            (essay) => essay.hasOwner._id!,
          )
        const assignedDate: string =
          data.findEssaysByAssociatedLessonIdAndCourseId.essays[0].assignedDate
        const dueDate: string =
          data.findEssaysByAssociatedLessonIdAndCourseId.essays[0].dueDate

        event({ type: 'SET_STUDENT_IDS', payload: studentIds })
        event({ type: 'SET_LESSON_ID', payload: lessonId })
        event({ type: 'SET_DUE_DATE', payload: dueDate })
        event({ type: 'SET_ASSIGNED_DATE', payload: assignedDate })
      }
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      {data?.findEssaysByAssociatedLessonIdAndCourseId.essays.length! > 0 && (
        <>
          <div>AssignedDate: {state.context.assignedDate}</div>
          {state.context.assignedDate !== todaysLocaleDate && (
            <button
              onClick={() =>
                event({ type: 'SET_ASSIGNED_DATE', payload: todaysLocaleDate })
              }
            >
              Use Today's Date
            </button>
          )}
          <div>DueDate: {state.context.dueDate}</div>
          <div>
            Reading Sections:{' '}
            {
              data?.findEssaysByAssociatedLessonIdAndCourseId.essays[0].readings
                .readingSections
            }
          </div>
          {data?.findEssaysByAssociatedLessonIdAndCourseId.essays.some(
            (essay) => essay.assigned === false,
          ) ? (
            <AssignEssay />
          ) : (
            <div>Already Assigned</div>
          )}
        </>
      )}
    </>
  )
}
