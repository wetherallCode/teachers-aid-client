import React, { FC } from 'react'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { LessonPlanOutputHeader } from './state-and-styles/lessonPlannerStyles'

export type LessonPlannerOutputProps = {}

export const LessonPlannerOutput: FC<LessonPlannerOutputProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const { date } = state.context
  return (
    <>
      <LessonPlanOutputHeader>What's the Plan</LessonPlanOutputHeader>
      {date && <div>Date: {date}</div>}
    </>
  )
}
