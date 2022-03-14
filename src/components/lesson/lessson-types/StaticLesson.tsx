import React, { FC } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me_Teacher_teachesCourses,
  DynamicLessonEnums,
  findLessonStatus_findLessonStatus_lesson,
} from '../../../schemaTypes'
import {
  LessonPageContainer,
  ClassInfoContainer,
  ClassInfoStyle,
  LessonComponentTypeContainer,
  LessonComponentTypeStyle,
  StopLessonContainer,
  StopLessonButton,
  LessonMainScreen,
} from '../state-n-styles/lessonStyles'
import { date } from '../../../utils'
import { useDailyAgendaContextProvider } from '../state-n-styles/DailyAgendaContext'
import { WarmUp } from '../lesson-components/WarmUp'
import { LessonDetails } from '../lesson-components/LessonDetails'
import { Vocab } from '../lesson-components/Vocab'
import { ExitActivity } from '../lesson-components/ExitActivity'

export type StaticLessonProps = {
  lesson: findLessonStatus_findLessonStatus_lesson
  courseToLoad?: me_me_Teacher_teachesCourses
}

export const StaticLesson: FC<StaticLessonProps> = ({
  lesson,
  courseToLoad,
}) => {
  const [state, event] = useDailyAgendaContextProvider()
  return (
    <LessonPageContainer>
      <ClassInfoContainer>
        <ClassInfoStyle>
          <div>{courseToLoad?.name}</div>
          <div>{date}</div>
        </ClassInfoStyle>
      </ClassInfoContainer>
      <StopLessonContainer>
        <StopLessonButton
          onClick={() => {
            event({ type: 'GET_LESSON' })
          }}
        >
          Leave Lesson
        </StopLessonButton>
      </StopLessonContainer>
      <LessonMainScreen>
        {state.context.staticLessonTypes === 'WARM_UP' && (
          <WarmUp lesson={lesson} />
        )}
        {state.context.staticLessonTypes === 'LESSON_DETAILS' && (
          <LessonDetails lesson={lesson} />
        )}
        {state.context.staticLessonTypes === 'VOCAB' && (
          <Vocab lesson={lesson} />
        )}
        {state.context.staticLessonTypes === 'EXIT_ACTIVITY' && (
          <ExitActivity lesson={lesson} />
        )}
      </LessonMainScreen>
      <LessonComponentTypeContainer>
        <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: DynamicLessonEnums.WARM_UP,
            })
          }
        >
          Warm Up
        </LessonComponentTypeStyle>
        <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: DynamicLessonEnums.LESSON_DETAILS,
            })
          }
        >
          Lesson Details
        </LessonComponentTypeStyle>
        <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: DynamicLessonEnums.VOCAB,
            })
          }
        >
          Vocab
        </LessonComponentTypeStyle>
        {/* <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: DynamicLessonEnums.PROTOCOLS,
            })
          }
        >
          Protocols
        </LessonComponentTypeStyle> */}
        <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: DynamicLessonEnums.EXIT_ACTIVITY,
            })
          }
        >
          Cool Down
        </LessonComponentTypeStyle>
      </LessonComponentTypeContainer>
    </LessonPageContainer>
  )
}
