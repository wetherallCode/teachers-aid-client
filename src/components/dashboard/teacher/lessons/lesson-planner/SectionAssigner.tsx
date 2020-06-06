import React, { FC } from 'react'
import { LessonPlannerTextListLoader } from './LessonPlannerTextListLoader'
import { LessonPlannerChapterSelect } from './LessonPlannerChapterSelect'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'
import { SectionSelect } from './SectionSelect'
import { UnitAssigner } from './UnitAssigner'

export type SectionAssignerProps = {}

export const SectionAssigner: FC<SectionAssignerProps> = () => {
  const [state] = useLessonPlannerContextProvider()

  return (
    <>
      <div>Assign Sections: </div>
      <div>In Text: </div>
      <LessonPlannerTextListLoader />
      <div>In Chapter: </div>
      <LessonPlannerChapterSelect text={state.context.fromText} />
      <SectionSelect />
      <UnitAssigner />
      <div>Starting Section: {state.context.startingSection}</div>
      <div>Starting Section: {state.context.endingSection}</div>
    </>
  )
}
