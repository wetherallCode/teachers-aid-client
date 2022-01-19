import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonComponentDetailsStyle,
  LessonMainScreen,
} from '../state-n-styles/lessonStyles'

export type ExitActivityProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const ExitActivity = ({ lesson }: ExitActivityProps) => {
  return (
    <>
      <LessonComponentTitleContainer>Exit Ticket</LessonComponentTitleContainer>
      <LessonComponentDetailsContainer>
        <LessonComponentDetailsStyle>
          {lesson.afterActivity.task}
        </LessonComponentDetailsStyle>
      </LessonComponentDetailsContainer>
    </>
  )
}
