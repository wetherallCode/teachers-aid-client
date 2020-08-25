import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonDetailsContainer,
  LessonDetailCenter,
  LessonDetailLeft,
} from '../lessonStyles'

export type LessonDetailsProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const LessonDetails: FC<LessonDetailsProps> = ({ lesson }) => {
  return (
    <>
      <LessonComponentTitleContainer>
        <div>Lesson Details</div>
      </LessonComponentTitleContainer>
      <LessonDetailsContainer>
        <LessonDetailCenter>
          Lesson Name: {lesson.lessonName}
        </LessonDetailCenter>
        <LessonDetailCenter>
          Essential Question: {lesson.essentialQuestion}
        </LessonDetailCenter>
        <LessonDetailCenter>
          Read page {lesson.pageNumbers.startingPage}-
          {lesson.pageNumbers.endingPage}:{' '}
          {lesson.assignedSections.startingSection}
          {lesson.assignedSections.endingSection !==
            lesson.assignedSections.startingSection &&
            '-' + lesson.assignedSections.endingSection}
        </LessonDetailCenter>
        <LessonDetailCenter>Objectives</LessonDetailCenter>
        <div>{lesson?.objectives}</div>
      </LessonDetailsContainer>
    </>
  )
}
