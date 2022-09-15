import React, { FC, useEffect } from 'react'
import { AssignedEssaySelect } from './essays/assigned-essays/AssignedEssaySelect'
import { CompletedEssaySelect } from './essays/completed-essays/CompletedEssaySelect'
import { AssignedReadingGuideSelect } from './readingGuides/assigned-reading-guides/AssignedReadingGuideSelect'
import {
  AssignmentsToCompleteContainer,
  AssignmentsTypeSelectorPanel,
  AssignmentsTypeStyle,
  AssignmentsTypeSelectorHeader,
  AssignmentTypeContainer,
  NoWorkContainer,
} from './state-n-styles/assignmentsStyles'
import {
  StudentAssignmentContextProvider,
  useStudentAssignmentContextProvider,
} from './state-n-styles/StudentAssignmentContext'
import { ArticleReviewSelect } from './articleReviews/ArticleReviewSelect'
import { MarkingPeriodSelector } from './MarkingPeriodSelector'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  findQuizzesByStudentId,
  findQuizzesByStudentIdVariables,
  MarkingPeriodEnum,
  me_me,
  me_me_Student,
  SchoolDayLengthEnum,
} from '../../../../schemaTypes'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { gql, useQuery } from '@apollo/client'
import { QuizSelect } from './quizzes/QuizSelect'
import { timeFinder } from '../../../../utils'
import { useTime } from '../../../../hooks/useTime'
import { useSchoolDayContextProvider } from '../../school-day/state/SchoolDayContext'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../../school-day/SchoolDay'
import { useClassTimeIndicator } from '../../../../hooks/useClassTimeIndicator'
import { Route, Routes } from 'react-router'
import { ArticleReviewToComplete } from './articleReviews/ArticleReviewToComplete'
import { ArticleReviewToCompleteContextProvider } from './articleReviews/state-styles/ArticleReviewToCompleteContext'
import { EssayToComplete } from './essays/assigned-essays/EssayToComplete'
import { StudentEssayContextProvider } from './essays/assigned-essays/state-and-styles/StudentEssayContext'
import { CompletedEssay } from './essays/completed-essays/CompletedEssay'
import { CompletedEssayContextProvider } from './essays/completed-essays/state/CompletedEssayContext'
import { QuizToComplete } from './quizzes/QuizToComplete'
import { QuizToCompleteContextProvider } from './quizzes/state-n-styles/QuizToCompleteContext'
// import { ReadingGuideToComplete } from './readingGuides/ReadingGuideToComplete'
import { ReadingGuideToCompleteContextProvider } from './readingGuides/state-and-styles/ReadingGuideToCompleteContext'
import { useAssignmentsAllowedInClassCheck } from '../../../../hooks/useAssignmentsAllowedInClassCheck'

export type StudentAssignmentsProps = {}

export const FIND_QUIZZES_BY_STUDENT_ID_QUERY = gql`
  query findQuizzesByStudentId($input: FindQuizzesByStudentIdInput!) {
    findQuizzesByStudentId(input: $input) {
      quizzes {
        _id
        isActive
        assigned
        readings {
          readingSections
        }
        finishedQuiz
        startedQuiz
      }
    }
  }
`

export const MARK_EXEMPT_MUTATION = gql`
  mutation markExempt($input: MarkExemptInput!) {
    markExempt(input: $input) {
      marked
    }
  }
`

export const StudentAssignments = ({}: StudentAssignmentsProps) => {
  const me: me_me_Student = useUserContextProvider()
  const { classTime } = useClassTimeIndicator(me)
  // const { assignmentsInClassAllowed } = me.inCourses[0].hasCourseInfo!
  const { assignmentsAllowedInClass } = useAssignmentsAllowedInClassCheck(me)
  const [state, event] = useStudentAssignmentContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  const { currentMarkingPeriod } = markingPeriodState.context

  const { loading, data } = useQuery<
    findQuizzesByStudentId,
    findQuizzesByStudentIdVariables
  >(FIND_QUIZZES_BY_STUDENT_ID_QUERY, {
    variables: {
      input: { markingPeriod: currentMarkingPeriod, studentId: me._id! },
    },
    // pollInterval: 1000,
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const { data: schoolDayData } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: new Date().toLocaleDateString() },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  return (
    <AssignmentsToCompleteContainer>
      <AssignmentsTypeSelectorPanel>
        <AssignmentsTypeSelectorHeader>
          Assignments
        </AssignmentsTypeSelectorHeader>
        <AssignmentsTypeStyle
          selected={state.matches('essaysToComplete')}
          onClick={() => event({ type: 'ESSAYS_TO_COMPLETE' })}
        >
          Essays to Complete
        </AssignmentsTypeStyle>
        <AssignmentsTypeStyle
          selected={state.matches('completedEssays')}
          onClick={() => event({ type: 'COMPLETED_ESSAYS' })}
        >
          Completed Essays
        </AssignmentsTypeStyle>
        <AssignmentsTypeStyle
          selected={state.matches('readingGuidesToComplete')}
          onClick={() => event({ type: 'READING_GUIDES' })}
        >
          Reading Guides to Complete
        </AssignmentsTypeStyle>
        {data?.findQuizzesByStudentId.quizzes.some((quiz) => quiz.assigned) && (
          <AssignmentsTypeStyle
            selected={state.matches('quizzes')}
            onClick={() => event({ type: 'QUIZZES' })}
          >
            Quizzes
          </AssignmentsTypeStyle>
        )}
        {/* <AssignmentsTypeStyle
          onClick={() => event({ type: 'ARTICLE_REVIEWS' })}
        >
          Article Reviews to Complete
        </AssignmentsTypeStyle> */}
      </AssignmentsTypeSelectorPanel>

      <AssignmentTypeContainer>
        {state.matches('essaysToComplete') && (
          <>
            {classTime && !assignmentsAllowedInClass ? (
              <NoWorkContainer>
                You can only do work after class
              </NoWorkContainer>
            ) : (
              <AssignedEssaySelect />
            )}
          </>
        )}
        {state.matches('completedEssays') && <CompletedEssaySelect />}
        {state.matches('readingGuidesToComplete') && (
          <>
            {classTime && !assignmentsAllowedInClass ? (
              <NoWorkContainer>
                You can only do work after class
              </NoWorkContainer>
            ) : (
              <AssignedReadingGuideSelect />
            )}
          </>
        )}
        {state.matches('articleReviewsToComplete') && (
          <>
            {classTime ? (
              <NoWorkContainer>
                You can only do work after class
              </NoWorkContainer>
            ) : (
              <ArticleReviewSelect />
            )}
          </>
        )}
        {state.matches('quizzes') && <>{classTime && <QuizSelect />}</>}
        <MarkingPeriodSelector />
      </AssignmentTypeContainer>
      {/* <Routes>
        <Route
          path='assignments/*'
          element={
            <StudentAssignmentContextProvider>
              <StudentAssignments />
            </StudentAssignmentContextProvider>
          }
        />
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
        <Route
          path='assignments/articleReview/toComplete/:articleReviewToComplete'
          element={
            <ArticleReviewToCompleteContextProvider>
              <ArticleReviewToComplete />
            </ArticleReviewToCompleteContextProvider>
          }
        />
        <Route
          path='assignments/quiz/toComplete/:quizToComplete'
          element={
            <QuizToCompleteContextProvider>
              <QuizToComplete />
            </QuizToCompleteContextProvider>
          }
        />
      </Routes> */}
    </AssignmentsToCompleteContainer>
  )
}
