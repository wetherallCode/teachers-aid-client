import React, { FC } from 'react'
import { LessonPlannerTextListLoader } from './LessonPlannerTextListLoader'
import { LessonPlannerChapterSelect } from './LessonPlannerChapterSelect'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { SectionSelect } from './SectionSelect'
import { UnitAssigner } from './UnitAssigner'

export type SectionAssignerProps = {}

export const SectionAssigner: FC<SectionAssignerProps> = () => {
  const [state] = useLessonPlannerContextProvider()

  return (
    <>
      {state.matches('sections.text') && <LessonPlannerTextListLoader />}
      {state.matches('sections.chapter') && (
        <LessonPlannerChapterSelect text={state.context.fromText} />
      )}
      {state.matches('sections.sectionList') && <SectionSelect />}
      {state.matches('sections.unit') && <UnitAssigner />}
    </>
  )
}
