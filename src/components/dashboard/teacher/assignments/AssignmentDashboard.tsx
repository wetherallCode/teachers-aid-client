import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import { CreateAssignment } from './create-assignments/CreateAssignment'
import { CreateAssignmentContextProvider } from './create-assignments/CreateAssignmentContext'
import { EditAssignments } from './edit-assignments/EditAssignments'

import { AssignmentsToGrade } from './grade-assignments/AssignmentsToGrade'
import { GradeEssay } from './grade-assignments/essay-grader/GradeEssay'
import { GradeEssayContextProvider } from './grade-assignments/essay-grader/GradeEssayContext'

export type AssignmentDashboardProps = {}

export const AssignmentDashboard: FC<AssignmentDashboardProps> = () => {
  return (
    <Routes>
      <Route
        path='create'
        element={
          <CreateAssignmentContextProvider>
            <CreateAssignment />
          </CreateAssignmentContextProvider>
        }
      />
      <Route path='edit' element={<EditAssignments />} />
      <Route path='grade/*' element={<AssignmentsToGrade />} />
      <Route
        path='grade/:assignmentId'
        element={
          <GradeEssayContextProvider>
            <GradeEssay />
          </GradeEssayContextProvider>
        }
      />
    </Routes>
  )
}
