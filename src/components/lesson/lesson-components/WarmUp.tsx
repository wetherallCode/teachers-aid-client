import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonComponentDetailsStyle,
} from '../state/lessonStyles'

export type WarmUpProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const WarmUp: FC<WarmUpProps> = ({ lesson }) => {
  return (
    <>
      <LessonComponentTitleContainer>Warm up</LessonComponentTitleContainer>
      <LessonComponentDetailsContainer>
        <LessonComponentDetailsStyle>
          {lesson.beforeActivity.task}
        </LessonComponentDetailsStyle>
      </LessonComponentDetailsContainer>
    </>
  )
}
