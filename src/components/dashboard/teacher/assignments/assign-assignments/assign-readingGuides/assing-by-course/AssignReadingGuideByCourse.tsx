import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LessonSelect } from './LessonSelect'
import { UnitSelect } from './UnitSelect'
import { AssignLesson } from './AssignLesson'

export type AssignReadingGuideByCourseProps = {}

export const AssignReadingGuideByCourse: FC<
  AssignReadingGuideByCourseProps
> = () => {
  const { course } = useParams()
  const [lessonId, setLessonId] = useState('')
  const [unitId, setUnitId] = useState('')

  return (
    <>
      <div>Assign Reading Guides By Lesson</div>
      <UnitSelect setUnitId={setUnitId} />
      {course && unitId && (
        <LessonSelect
          course={course}
          unitId={unitId}
          setLessonId={setLessonId}
        />
      )}
      {lessonId && <AssignLesson courseId={course!} lessonId={lessonId} />}
    </>
  )
}
