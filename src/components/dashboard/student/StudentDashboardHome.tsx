import React from 'react'
import { Routes, Route } from 'react-router'
import { StudentAssignments } from './assignments/StudentAssignments'
import { EssayToComplete } from './assignments/essays/assigned-essays/EssayToComplete'
import { StudentEssayContextProvider } from './assignments/essays/assigned-essays/StudentEssayContext'
import { CompletedEssay } from './assignments/essays/completed-essays/CompletedEssay'
import { CompletedEssayContextProvider } from './assignments/essays/completed-essays/state/CompletedEssayContext'
import { ReadingGuideToComplete } from './assignments/readingGuides/ReadingGuideToComplete'
import { ReadingGuideToCompleteContextProvider } from './assignments/readingGuides/state/ReadingGuideToCompleteContext'

export const StudentDashboardHome = () => {
  return (
    <>
      <Routes>
        <Route path='assignments/*' element={<StudentAssignments />} />
        <Route
          path='assignments/essay/toComplete/:essayToComplete'
          element={
            <StudentEssayContextProvider>
              <EssayToComplete />
            </StudentEssayContextProvider>
          }
        />
        <Route
          path='assignments/essay/completed/:completedEssay'
          element={
            <CompletedEssayContextProvider>
              <CompletedEssay />
            </CompletedEssayContextProvider>
          }
        />
        <Route
          path='assignments/reading-guide/toComplete/:readingGuideToComplete'
          element={
            <ReadingGuideToCompleteContextProvider>
              <ReadingGuideToComplete />
            </ReadingGuideToCompleteContextProvider>
          }
        />
      </Routes>
    </>
  )
}
