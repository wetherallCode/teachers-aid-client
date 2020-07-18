import React from 'react'
import { Routes, Route } from 'react-router'
import { StudentAssignments } from './assignments/StudentAssignments'
import { EssayToComplete } from './assignments/essays/assigned-essays/EssayToComplete'
import { StudentEssayContextProvider } from './assignments/essays/assigned-essays/StudentEssayContext'
import { CompletedEssay } from './assignments/essays/completed-essays/CompletedEssay'
import { CompletedEssayContextProvider } from './assignments/essays/completed-essays/CompletedEssayContext'

export const StudentDashboardHome = () => {
  return (
    <>
      <Routes>
        <Route path='assignments/*' element={<StudentAssignments />} />
        <Route
          path='assignments/toComplete/:essayToComplete'
          element={
            <StudentEssayContextProvider>
              <EssayToComplete />
            </StudentEssayContextProvider>
          }
        />
        <Route
          path='assignments/completed/:completedEssay'
          element={
            <CompletedEssayContextProvider>
              <CompletedEssay />
            </CompletedEssayContextProvider>
          }
        />
      </Routes>
    </>
  )
}
