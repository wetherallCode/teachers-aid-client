import React from 'react'
import { LessonTypeEnum } from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  LessonTypeContianer,
  LessonTypes,
  LessonTypeSelectorContainer,
  TitleContainer,
} from './state-and-styles/lessonPlannerStyles'

export type LessonTypeSelectorProps = {}

export const LessonTypeSelector = ({}: LessonTypeSelectorProps) => {
  const [state, event] = useLessonPlannerContextProvider()

  return (
    <LessonTypeSelectorContainer>
      <TitleContainer>
        <div>Choose Lesson Type</div>
      </TitleContainer>
      <LessonTypeContianer>
        <LessonTypes
          selected={state.context.lessonType === LessonTypeEnum.INTRODUCTORY}
          onClick={() =>
            event({
              type: 'SET_LESSON_TYPE',
              payload: LessonTypeEnum.INTRODUCTORY,
            })
          }
        >
          Introductory Lesson
        </LessonTypes>
        <LessonTypes
          selected={state.context.lessonType === LessonTypeEnum.REINFORCEMENT}
          onClick={() =>
            event({
              type: 'SET_LESSON_TYPE',
              payload: LessonTypeEnum.REINFORCEMENT,
            })
          }
        >
          Reinforcement Lesson
        </LessonTypes>
      </LessonTypeContianer>
    </LessonTypeSelectorContainer>
  )
}
