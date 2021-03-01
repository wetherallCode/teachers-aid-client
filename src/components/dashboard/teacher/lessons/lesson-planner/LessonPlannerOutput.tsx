import React, { FC } from 'react'
import { markingPeriodFormatter } from '../../../../../utils'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { LessonPlanOutputHeader } from './state-and-styles/lessonPlannerStyles'

export type LessonPlannerOutputProps = {}

export const LessonPlannerOutput: FC<LessonPlannerOutputProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const {
    date,
    fromText,
    fromChapterTitle,
    startingSection,
    endingSection,
    startingPage,
    endingPage,
    essentialQuestion,
    markingPeriod,
  } = state.context

  return (
    <>
      <LessonPlanOutputHeader>What's the Plan</LessonPlanOutputHeader>
      {date && <div>Date: {date}</div>}
      {markingPeriod && (
        <div>{markingPeriodFormatter(markingPeriod)} Marking Period</div>
      )}
      {fromText && <div>From Text: {fromText}</div>}
      {fromChapterTitle && <div>From Chapter: {fromChapterTitle}</div>}
      {startingSection && <div>Starting Section: {startingSection}</div>}
      {startingSection !== endingSection && (
        <div>Ending Section: {endingSection}</div>
      )}
      {startingPage !== 0 && endingPage !== 0 ? (
        <div>
          Pages: {startingPage} - {endingPage}
        </div>
      ) : startingPage !== 0 ? (
        <div>Page: {startingPage}</div>
      ) : (
        ''
      )}
      {essentialQuestion && (
        <>
          <div>Essential Question: {essentialQuestion}</div>
        </>
      )}
    </>
  )
}
