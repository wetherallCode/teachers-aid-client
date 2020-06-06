import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findLessonsByUnit,
  findLessonsByUnitVariables,
} from '../../../../../schemaTypes'
import { useCreateAssignmentContextPovider } from './CreateAssignmentContext'

export type LessonSelectProps = {}

export const FIND_LESSONS_BY_UNIT_QUERY = gql`
  query findLessonsByUnit($input: FindLessonsByUnitInput!) {
    findLessonsByUnit(input: $input) {
      lessons {
        _id
        lessonName
      }
    }
  }
`

export const LessonSelect: FC<LessonSelectProps> = () => {
  const [state, event] = useCreateAssignmentContextPovider()

  const { loading, error, data } = useQuery<
    findLessonsByUnit,
    findLessonsByUnitVariables
  >(FIND_LESSONS_BY_UNIT_QUERY, {
    variables: {
      input: { unitId: state.context.unit, courseId: state.context.courseId },
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <div>Select Lesson</div>
      <select
        onChange={(e: any) =>
          event({ type: 'SET_LESSON', payload: e.target.value })
        }
      >
        <option value={undefined}>Pick a Lesson</option>
        {data?.findLessonsByUnit.lessons.map((lesson) => (
          <option key={lesson._id!} value={lesson._id!}>
            {lesson.lessonName}
          </option>
        ))}
      </select>
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
