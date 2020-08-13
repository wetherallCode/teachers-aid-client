import React, { FC } from 'react'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'
import { SectionAssigner } from './SectionAssigner'
import { LessonPlanInfo } from './LessonPlanInfo'
import { CourseAssigner } from './CourseAssigner'
import { CreateLesson } from './CreateLesson'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'

export type LessonPlannerProps = {}

export const LessonPlanner: FC<LessonPlannerProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const [mp] = useMarkingPeriodContextProvider()
  console.log(state.context)
  return (
    <div>
      <div>Lesson Planner</div>
      {state.matches('date') && (
        <>
          <div>Assigned Date: </div>
          <input
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
        </>
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
    </div>
  )
}
