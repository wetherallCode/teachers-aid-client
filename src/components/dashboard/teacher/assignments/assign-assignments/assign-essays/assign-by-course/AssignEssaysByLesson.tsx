import React, { FC } from 'react'
import { LessonSelect } from '../LessonSelect'
import { useParams } from 'react-router-dom'

export type AssignEssaysByLessonProps = {}

export const AssignEssaysByLesson: FC<AssignEssaysByLessonProps> = () => {
  const { course } = useParams()

  return (
    <>
      <div>Assign Essay by Lesson</div>
      {course && <LessonSelect course={course} />}
    </>
  )
}
