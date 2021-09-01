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

export const ExitActivity: FC<ExitActivityProps> = ({ lesson }) => {
  return (
    <LessonMainScreen>
      <LessonComponentTitleContainer>Cool Down</LessonComponentTitleContainer>
      <LessonComponentDetailsContainer>
        <LessonComponentDetailsStyle>
          {lesson.afterActivity.task}
        </LessonComponentDetailsStyle>
      </LessonComponentDetailsContainer>
    </LessonMainScreen>
  )
}
