import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { StudentAssignments } from './assignments/StudentAssignments'
import { EssayToComplete } from './assignments/essays/assigned-essays/EssayToComplete'
import { StudentEssayContextProvider } from './assignments/essays/assigned-essays/state-and-styles/StudentEssayContext'
import { CompletedEssay } from './assignments/essays/completed-essays/CompletedEssay'
import { CompletedEssayContextProvider } from './assignments/essays/completed-essays/state/CompletedEssayContext'
import { ReadingGuideToComplete } from './assignments/readingGuides/ReadingGuideToComplete'
import { ReadingGuideToCompleteContextProvider } from './assignments/readingGuides/state/ReadingGuideToCompleteContext'
import { LessonMainMenu } from '../../lesson/LessonMainMenu'
import { DailyAgendaContextProvider } from '../../lesson/state/DailyAgendaContext'
import { StudentAssignmentContextProvider } from './assignments/StudentAssignmentContext'

export const StudentDashboardHome = () => {
  const { pathname } = useLocation()
  return (
    <StudentAssignmentContextProvider>
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
      {pathname === '/dashboard' && (
        <DailyAgendaContextProvider>
          <LessonMainMenu />
        </DailyAgendaContextProvider>
      )}
    </StudentAssignmentContextProvider>
  )
}
