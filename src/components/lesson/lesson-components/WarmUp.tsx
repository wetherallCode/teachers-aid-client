import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'

export type WarmUpProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const WarmUp: FC<WarmUpProps> = ({ lesson }) => {
  return (
    <>
      <div>Warm up</div>
      <div>{lesson.beforeActivity.task}</div>
    </>
  )
}
