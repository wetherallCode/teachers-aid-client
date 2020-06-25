import React from 'react'
import { Routes, Route } from 'react-router'
import { StudentAssignments } from './assignments/StudentAssignments'
import { EssayToComplete } from './assignments/essays/EssayToComplete'
import { StudentEssayContextProvider } from './assignments/essays/StudentEssayContext'

export const StudentDashboardHome = () => {
  return (
    <>
      <Routes>
        <Route path='assignments/*' element={<StudentAssignments />} />
        <Route
          path='assignments/:essayToComplete'
          element={
            <StudentEssayContextProvider>
              <EssayToComplete />
            </StudentEssayContextProvider>
          }
        />
      </Routes>
    </>
  )
}
