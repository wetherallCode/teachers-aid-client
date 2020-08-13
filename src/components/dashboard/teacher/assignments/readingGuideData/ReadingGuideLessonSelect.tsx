import React, { FC, Dispatch, SetStateAction } from 'react'
import { useQuery } from '@apollo/client'
import {
  findLessonsByUnit,
  findLessonsByUnitVariables,
} from '../../../../../schemaTypes'
import { FIND_LESSONS_BY_UNIT_QUERY } from '../create-assignments/create-essay/EssayLessonSelect'

export type ReadingGuideLessonSelectProps = {
  course: string
  unitId: string
  setLessonId: Dispatch<SetStateAction<string>>
}

export const ReadingGuideLessonSelect: FC<ReadingGuideLessonSelectProps> = ({
  course,
  unitId,
  setLessonId,
}) => {
  const { loading, data } = useQuery<
    findLessonsByUnit,
    findLessonsByUnitVariables
  >(FIND_LESSONS_BY_UNIT_QUERY, {
    variables: {
      input: { courseId: course, unitId: unitId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading</div>

  return (
    <>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setLessonId(e.target.value)
          }
        }}
      >
        <option value={'none'}>Select a Lesson</option>
        {data?.findLessonsByUnit.lessons.map((lesson) => (
          <option key={lesson._id!} value={lesson._id!}>
            {lesson.lessonName}
          </option>
        ))}
      </select>
    </>
  )
}
