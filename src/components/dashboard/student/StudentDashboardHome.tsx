import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { StudentAssignments } from './assignments/StudentAssignments'
import { EssayToComplete } from './assignments/essays/assigned-essays/EssayToComplete'
import { StudentEssayContextProvider } from './assignments/essays/assigned-essays/state-and-styles/StudentEssayContext'
import { CompletedEssay } from './assignments/essays/completed-essays/CompletedEssay'
import { CompletedEssayContextProvider } from './assignments/essays/completed-essays/state/CompletedEssayContext'
import { ReadingGuideToComplete } from './assignments/readingGuides/ReadingGuideToComplete'
import { ReadingGuideToCompleteContextProvider } from './assignments/readingGuides/state-and-styles/ReadingGuideToCompleteContext'
import { LessonMainMenu } from '../../lesson/LessonMainMenu'
import { DailyAgendaContextProvider } from '../../lesson/state-n-styles/DailyAgendaContext'
import { StudentAssignmentContextProvider } from './assignments/state-n-styles/StudentAssignmentContext'
import { ArticleReviewToComplete } from './assignments/articleReviews/ArticleReviewToComplete'
import { ArticleReviewToCompleteContextProvider } from './assignments/articleReviews/state-styles/ArticleReviewToCompleteContext'
import { QuizToCompleteContextProvider } from './assignments/quizzes/state-n-styles/QuizToCompleteContext'
import { QuizToComplete } from './assignments/quizzes/QuizToComplete'
import { StudentBehavior } from './behavior/StudentBehavior'
import { logout, me_me_Student } from '../../../schemaTypes'
import {
  StudentHomeScreenOptionsContainer,
  StudentHomeScreenOptions,
  OptionTitle,
  LogoutOption,
  HomeScreenTitle,
  HomeScreenContainer,
} from '../../home/homeStyles'
import { StudentGradeDisplay } from '../../home/StudentGradeDisplay'
import { TodaysLessonPlan } from '../../lesson/TodaysLessonPlan'
import { useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from '../../home/Logout'
import { useToggle } from '../../../hooks'
import { capitalizer } from '../../../utils'
import { Greetings } from '../../home/Greetings'
import { LessonDisplay } from './lesson/LessonDisplay'
import { Grades } from './grades/Grades'

export type StudentDashboardHomeProps = {
  me: me_me_Student
}

export const StudentDashboardHome = ({ me }: StudentDashboardHomeProps) => {
  const { pathname } = useLocation()
  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [hasLessonNow, setHasLessonNow] = useState(false)
  const [logoutMutation, { loading }] = useMutation<logout>(LOGOUT_MUTATION, {
    onCompleted: () => {
      toggleLogin()
    },
    refetchQueries: ['me'],
  })
  const lessonLink = hasLessonNow ? 'lesson-home' : ''
  return (
    <>
      {pathname === '/dashboard' && (
        <>
          <HomeScreenContainer>
            <HomeScreenTitle>
              <Greetings phrase={me.firstName} />
            </HomeScreenTitle>
            <StudentHomeScreenOptionsContainer>
              {/* <StudentHomeScreenOptions to={lessonLink}>
                <OptionTitle>Today's Lesson Plan</OptionTitle> */}
              <LessonDisplay
                setHasLessonNow={setHasLessonNow}
                me={me}
                lessonLink={lessonLink}
              />
              {/* <StyledLink to='/lesson-home'>
        <StudentOptionsLinkButton>Go</StudentOptionsLinkButton>
      </StyledLink> 
              </StudentHomeScreenOptions>*/}

              <StudentHomeScreenOptions to='/dashboard/assignments'>
                <OptionTitle>Get Assignments</OptionTitle>
                {/* <StyledLink to='/dashboard/assignments'>
        <StudentOptionsLinkButton>Go</StudentOptionsLinkButton>
      </StyledLink> */}
              </StudentHomeScreenOptions>
              <StudentHomeScreenOptions to='grades'>
                {me && me.__typename === 'Student' && (
                  <StudentGradeDisplay studentId={me._id!} />
                )}
              </StudentHomeScreenOptions>
              <StudentHomeScreenOptions to='behavior-home'>
                <OptionTitle>How did I do Today?</OptionTitle>
              </StudentHomeScreenOptions>
              <StudentHomeScreenOptions to=''>5th Box</StudentHomeScreenOptions>
              <LogoutOption onClick={() => logoutMutation()}>
                {loading ? 'Logging Out...' : 'Logout'}
              </LogoutOption>
            </StudentHomeScreenOptionsContainer>
          </HomeScreenContainer>
        </>
      )}
      <Routes>
        <Route
          path='assignments/*'
          element={
            <StudentAssignmentContextProvider>
              <StudentAssignments />{' '}
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

        <Route
          element={
            <DailyAgendaContextProvider>
              <LessonMainMenu />
            </DailyAgendaContextProvider>
          }
        />

        <Route path='behavior-home' element={<StudentBehavior me={me} />} />
        <Route path='grades' element={<Grades me={me} />} />
      </Routes>
      <Routes></Routes>
    </>
  )
}
