import { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useAssignReadingGuideByCourseContextProvider } from './state/AssignReadingGuideByCourseContext'
import {
  findReadingGuidesByAssociatedLessonAndCourseId,
  findReadingGuidesByAssociatedLessonAndCourseIdVariables,
} from '../../../../../../../schemaTypes'
import { AssignReadingGuide } from './AssignReadingGuide'

export type AssignLessonProps = {
  lessonId: string
  courseId: string
}

export const FIND_READING_GUIDE_BY_LESSON_AND_COURSE_QUERY = gql`
  query findReadingGuidesByAssociatedLessonAndCourseId(
    $input: FindReadingGuidesByAssociatedLessonAndCourseIdInput!
  ) {
    findReadingGuidesByAssociatedLessonAndCourseId(input: $input) {
      readingGuides {
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
  const [state, event] = useAssignReadingGuideByCourseContextProvider()

  const todaysDate: string = new Date().toLocaleString().substring(0, 9)
  const { loading, data } = useQuery<
    findReadingGuidesByAssociatedLessonAndCourseId,
    findReadingGuidesByAssociatedLessonAndCourseIdVariables
  >(FIND_READING_GUIDE_BY_LESSON_AND_COURSE_QUERY, {
    variables: {
      input: { courseId, lessonId },
    },
    onCompleted: (data) => {
      if (
        data.findReadingGuidesByAssociatedLessonAndCourseId.readingGuides
          .length > 0
      ) {
        const studentIds: string[] =
          data.findReadingGuidesByAssociatedLessonAndCourseId.readingGuides.map(
            (readingGuide) => readingGuide.hasOwner._id!
          )
        const assignedDate: string =
          data.findReadingGuidesByAssociatedLessonAndCourseId.readingGuides[0]
            .assignedDate
        const dueDate: string =
          data.findReadingGuidesByAssociatedLessonAndCourseId.readingGuides[0]
            .dueDate
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
      {data?.findReadingGuidesByAssociatedLessonAndCourseId.readingGuides
        .length! > 0 && (
        <>
          <div>AssignedDate: {state.context.assignedDate}</div>
          {state.context.assignedDate !== todaysDate && (
            <button
              onClick={() =>
                event({ type: 'SET_ASSIGNED_DATE', payload: todaysDate })
              }
            >
              Use Today's Date
            </button>
          )}
          <div>DueDate: {state.context.dueDate}</div>
          <div>
            Reading Sections:{' '}
            {
              data?.findReadingGuidesByAssociatedLessonAndCourseId
                .readingGuides[0].readings.readingSections
            }
          </div>
          {data?.findReadingGuidesByAssociatedLessonAndCourseId.readingGuides.some(
            (readingGuide) => readingGuide.assigned === false
          ) ? (
            <AssignReadingGuide />
          ) : (
            <div>Already Assigned</div>
          )}
        </>
      )}
    </>
  )
}
