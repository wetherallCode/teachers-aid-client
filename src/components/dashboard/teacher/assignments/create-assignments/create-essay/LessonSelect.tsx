import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findLessonsByUnit,
  findLessonsByUnitVariables,
} from '../../../../../../schemaTypes'
import { useCreateAssignmentContextPovider } from '../CreateAssignmentContext'

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
  console.log(state.context.essay.unit, state.context.courseId)
  const { loading, data } = useQuery<
    findLessonsByUnit,
    findLessonsByUnitVariables
  >(FIND_LESSONS_BY_UNIT_QUERY, {
    variables: {
      input: {
        unitId: state.context.essay.unit,
        courseId: state.context.courseId,
      },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  console.log(state.context.essay.lesson)
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
