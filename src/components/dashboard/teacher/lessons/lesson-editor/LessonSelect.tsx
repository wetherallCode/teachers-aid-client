import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  findLessonsByUnit,
  findLessonsByUnitVariables,
} from '../../../../../schemaTypes'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { FIND_LESSONS_BY_UNIT_QUERY } from '../../assignments/create-assignments/create-essay/EssayLessonSelect'

export type LessonSelectProps = {
  unit: string
}

export const LessonSelect: FC<LessonSelectProps> = ({ unit }) => {
  const [state, event] = useLessonEditorContextProvider()
  console.log(state.context.courseId, unit)
  const { loading, error, data } = useQuery<
    findLessonsByUnit,
    findLessonsByUnitVariables
  >(FIND_LESSONS_BY_UNIT_QUERY, {
    variables: {
      input: { unitId: unit, courseId: state.context.courseId },
    },
    onCompleted: (data) => console.log(data),
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <>
      <button onClick={() => event({ type: 'PREVIOUS' })}>Previous</button>
      <div>Select Lesson</div>
      <select
        onChange={(e: any) =>
          event({ type: 'SET_LESSON_ID', payload: e.target.value })
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
