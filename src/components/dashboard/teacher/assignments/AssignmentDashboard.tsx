import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import { CreateAssignment } from './create-assignments/CreateAssignment'
import { CreateAssignmentContextProvider } from './create-assignments/state-and-styles/CreateAssignmentContext'
import { EditAssignments } from './edit-assignments/EditAssignments'

import { AssignmentsToGrade } from './grade-assignments/AssignmentsToGrade'
import { GradeEssay } from './grade-assignments/essays/essay-grader/GradeEssay'
import { GradeEssayContextProvider } from './grade-assignments/essays/essay-grader/GradeEssayContext'
import { AssignAssignments } from './assign-assignments/AssignAssignments'
import { GradePaperBasedAssignment } from './grade-assignments/paper-based/GradePaperBasedAssignment'
import { PaperBasedContextProvider } from './grade-assignments/paper-based/state/PaperBasedContext'

import { ArticleReviewManager } from './article-reviews/ArticleReviewManager'
import { ArticleReviewContextProvider } from './article-reviews/state-styles/ArticleReviewContext'
import { GradeEssayContainerContextProvider } from './grade-assignments/state-n-styles/GradeEssayContainerContext'
import { GrammarPractice } from '../development/grammar/GrammarPractice'

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
      <Route
        path='article-reviews'
        element={
          <ArticleReviewContextProvider>
            <ArticleReviewManager />
          </ArticleReviewContextProvider>
        }
      />
      <Route path='edit' element={<EditAssignments />} />
      {/* <GradeEssayContextProvider> */}
      <Route
        path='grade/*'
        element={
          <GradeEssayContainerContextProvider>
            <AssignmentsToGrade />
          </GradeEssayContainerContextProvider>
        }
      />
      <Route
        path='grade/:essayId'
        element={
          <GradeEssayContextProvider>
            <GradeEssay />
          </GradeEssayContextProvider>
        }
      />
      {/* </GradeEssayContextProvider> */}
      <Route
        path='grade/paper-based/:assignmentId'
        element={
          <PaperBasedContextProvider>
            <GradePaperBasedAssignment />
          </PaperBasedContextProvider>
        }
      />
      <Route path='assign/*' element={<AssignAssignments />} />
    </Routes>
  )
}
