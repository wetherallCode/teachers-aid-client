import React, { FC } from 'react'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  LessonNameContainer,
  LessonNameTitle,
  LessonNameInput,
} from './state-and-styles/lessonPlannerStyles'

export type LessonNameProps = {}

export const LessonName: FC<LessonNameProps> = () => {
  const [, event] = useLessonPlannerContextProvider()
  return (
    <LessonNameContainer>
      <LessonNameTitle>Lesson Name</LessonNameTitle>
      <LessonNameInput
        type='text'
        name='lessonName'
        onChange={(e: any) =>
          event({ type: 'SET_LESSON_NAME', payload: e.target.value })
        }
      />
    </LessonNameContainer>
  )
}
