import React, { FC, useEffect } from 'react'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  LessonNameContainer,
  LessonNameTitle,
  LessonNameInput,
} from './state-and-styles/lessonPlannerStyles'

export type LessonNameProps = {}

export const LessonName: FC<LessonNameProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()

  useEffect(() => {
    event({
      type: 'SET_LESSON_NAME',
      payload:
        state.context.texSectionListHeaders[0] +
        ' - ' +
        state.context.texSectionListHeaders[
          state.context.texSectionListHeaders.length - 1
        ],
    })
  }, [])

  return (
    // <LessonNameContainer>
    //   <LessonNameTitle>Lesson Name: {state.context.lessonName}</LessonNameTitle>
    // </LessonNameContainer>
    null
  )
}
