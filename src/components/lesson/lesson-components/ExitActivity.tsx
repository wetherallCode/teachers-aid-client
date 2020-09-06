import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonComponentDetailsStyle,
} from '../state/lessonStyles'

export type ExitActivityProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const ExitActivity: FC<ExitActivityProps> = ({ lesson }) => {
  return (
    <>
      <LessonComponentTitleContainer>Cool Down</LessonComponentTitleContainer>
      <LessonComponentDetailsContainer>
        <LessonComponentDetailsStyle>
          {lesson.afterActivity.task}
        </LessonComponentDetailsStyle>
      </LessonComponentDetailsContainer>
    </>
  )
}
