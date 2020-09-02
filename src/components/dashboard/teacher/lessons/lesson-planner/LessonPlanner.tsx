import React, { FC } from 'react'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { SectionAssigner } from './SectionAssigner'
import { LessonPlanInfo } from './LessonPlanInfo'
import { CourseAssigner } from './CourseAssigner'
import { CreateLesson } from './CreateLesson'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  LessonPlannerContainer,
  LessonPlannerHeader,
  LessonPlanOutput,
  LessonPlannerDesignContainer,
  LessonPlanGeneralInfoContainer,
  LessonPlanDateAssign,
  LessonPlanDateInput,
} from './state-and-styles/lessonPlannerStyles'
import { LessonPlannerOutput } from './LessonPlannerOutput'

export type LessonPlannerProps = {}

export const LessonPlanner: FC<LessonPlannerProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const [mp] = useMarkingPeriodContextProvider()

  return (
    <LessonPlannerContainer>
      <LessonPlannerDesignContainer>
        <LessonPlannerHeader>
          <div>Lesson Planner</div>
        </LessonPlannerHeader>
        {state.matches('date') && (
          <LessonPlanDateAssign>
            <div>Assigned Date: </div>
            <LessonPlanDateInput
              type='date'
              name='assignedDate'
              onChange={(e: any) => {
                event({
                  type: 'SET_DATE',
                  payload: e.target.value,
                })
                event({ type: 'NEXT' })
              }}
            />
          </LessonPlanDateAssign>
        )}
        {state.matches('sections') && <SectionAssigner />}
        {state.matches('lessonInfo') && (
          <div>
            <LessonPlanInfo />
            <button onClick={() => event({ type: 'NEXT' })}>Next</button>
          </div>
        )}
        {state.matches('courses') && <CourseAssigner />}
        {state.matches('createLesson') && (
          <CreateLesson mp={mp.context.currentMarkingPeriod} />
        )}
      </LessonPlannerDesignContainer>
      <LessonPlanOutput>
        <LessonPlannerOutput />
      </LessonPlanOutput>
    </LessonPlannerContainer>
  )
}
