import React, { FC } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me_Teacher_teachesCourses,
  DynamicLessonEnums,
  findLessonStatus_findLessonStatus_lesson,
  me_me,
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
import { useNavigate } from 'react-router'
import { TextAnalysis } from '../../dashboard/student/handbook/TextAnalysis'
import { HandbookInformationDisplayContainer } from '../../dashboard/student/handbook/handbookStyles'
import { TextAnalysisForStudentLesson } from '../lesson-components/TextAnalysisForStudentLesson'
import { useUserContextProvider } from '../../../contexts/UserContext'

export type StaticLessonProps = {
  lesson: findLessonStatus_findLessonStatus_lesson
  courseToLoad?: me_me_Teacher_teachesCourses
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const StaticLesson = ({
  lesson,
  courseToLoad,
  setPolling,
}: StaticLessonProps) => {
  const [state, event] = useDailyAgendaContextProvider()
  const me: me_me = useUserContextProvider()
  const nav = useNavigate()
  return (
    <LessonPageContainer>
      <ClassInfoContainer>
        <ClassInfoStyle>
          <div>{courseToLoad?.name}</div>
          <div>{date}</div>
        </ClassInfoStyle>
      </ClassInfoContainer>
      <StopLessonContainer></StopLessonContainer>
      <LessonMainScreen>
        {/* {state.context.staticLessonTypes === 'WARM_UP' && (
          <WarmUp lesson={lesson} me={me} />
        )} */}
        {state.context.staticLessonTypes === 'LESSON_DETAILS' && (
          <LessonDetails lesson={lesson} setPolling={setPolling} />
        )}
        {state.context.staticLessonTypes === 'VOCAB' && (
          <Vocab lesson={lesson} setPolling={setPolling} />
        )}
        {/* {state.context.staticLessonTypes === 'EXIT_ACTIVITY' && (
          <ExitActivity lesson={lesson} me={me} setPolling={setPolling} />
        )} */}
        {state.context.staticLessonTypes === 'TEXT_ANALYSIS' && (
          <TextAnalysisForStudentLesson />
        )}
      </LessonMainScreen>
      <LessonComponentTypeContainer>
        {/* <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: DynamicLessonEnums.WARM_UP,
            })
          }
        >
          Warm Up
        </LessonComponentTypeStyle> */}
        <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: DynamicLessonEnums.LESSON_DETAILS,
            })
          }
        >
          Daily Agenda
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
        {/* {lesson.lessonType === 'REINFORCEMENT' ? (
          <LessonComponentTypeStyle
            onClick={() =>
              event({
                type: 'SET_STATIC_LESSON_TYPE',
                payload: DynamicLessonEnums.EXIT_ACTIVITY,
              })
            }
          >
            Exit Ticket
          </LessonComponentTypeStyle>
        ) : ( */}
        <LessonComponentTypeStyle
          onClick={() =>
            event({
              type: 'SET_STATIC_LESSON_TYPE',
              payload: 'TEXT_ANALYSIS',
            })
          }
        >
          Help
        </LessonComponentTypeStyle>
        {/* )} */}
      </LessonComponentTypeContainer>
    </LessonPageContainer>
  )
}
