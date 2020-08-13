import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'

export type LessonDetailsProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const LessonDetails: FC<LessonDetailsProps> = ({ lesson }) => {
  return (
    <>
      <div>{lesson.lessonName}</div>
      <div>{lesson.essentialQuestion}</div>
      <div>{lesson?.objectives}</div>
      <div>
        Read page {lesson.pageNumbers.startingPage}-
        {lesson.pageNumbers.endingPage}:{' '}
        {lesson.assignedSections.startingSection}
        {lesson.assignedSections.endingSection !==
          lesson.assignedSections.startingSection &&
          '-' + lesson.assignedSections.endingSection}
      </div>
    </>
  )
}
