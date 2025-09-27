import { AssignedEssaySelect } from './essays/assigned-essays/AssignedEssaySelect'
import { AssignedReadingGuideSelect } from './readingGuides/assigned-reading-guides/AssignedReadingGuideSelect'
import {
  AssignmentsToCompleteContainer,
  AssignmentsTypeSelectorPanel,
  AssignmentsTypeStyle,
  AssignmentsTypeSelectorHeader,
  AssignmentTypeContainer,
  NoWorkContainer,
} from './state-n-styles/assignmentsStyles'
import { useStudentAssignmentContextProvider } from './state-n-styles/StudentAssignmentContext'
import { ArticleReviewSelect } from './articleReviews/ArticleReviewSelect'
import { MarkingPeriodSelector } from './MarkingPeriodSelector'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  findQuizzesByStudentId,
  findQuizzesByStudentIdVariables,
  findStudentInfoByStudentIdForDesk,
  findStudentInfoByStudentIdForDeskVariables,
  me_me_Student,
} from '../../../../schemaTypes'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { gql, useQuery } from '@apollo/client'
import { QuizSelect } from './quizzes/QuizSelect'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../../school-day/SchoolDay'
import { useClassTimeIndicator } from '../../../../hooks/useClassTimeIndicator'
import { useAssignmentsAllowedInClassCheck } from '../../../../hooks/useAssignmentsAllowedInClassCheck'
import { FIND_STUDENT_INFO_FOR_DESK_QUERY } from '../../teacher/teachers-aid/main-screen/seating-chart/Desk'
import { AllAssignments } from './allAssignments/AllAssignments'
import { CompletedEssaySelect } from './essays/completed-essays/CompletedEssaySelect'

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
  // Get the current user's info
  const me: me_me_Student = useUserContextProvider()

  // Get the current class time
  const { classTime } = useClassTimeIndicator(me)

  // Get the current assignments allowed in class
  const { assignmentsAllowedInClass } = useAssignmentsAllowedInClassCheck(me)

  // Get the current state and event from the StudentAssignmentContextProvider
  const [state, event] = useStudentAssignmentContextProvider()

  // Get the current marking period state
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  // Get the current marking period
  const { currentMarkingPeriod } = markingPeriodState.context

  // Query the database for all quizzes assigned to the current student
  const { loading, data } = useQuery<
    findQuizzesByStudentId,
    findQuizzesByStudentIdVariables
  >(FIND_QUIZZES_BY_STUDENT_ID_QUERY, {
    variables: {
      input: { markingPeriod: currentMarkingPeriod, studentId: me._id! },
    },
    // Call this function when the query is completed
    // onCompleted: (data) => console.log(data),
    // Call this function if there is an error
    onError: (error) => console.error(error),
  })

  // Check if the current student is absent
  const isAbsent =
    me.hasAbsences.length > 0 &&
    me.hasAbsences.find((a) => a.dayAbsent === new Date().toLocaleDateString())

  // Check if the classwork is locked
  const classworkLocked =
    classTime &&
    !assignmentsAllowedInClass &&
    !isAbsent &&
    me.hasAssignmentsLocked
  console.log(me)
  const tempAllowQuiz = true
  // Render the following
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
        <AssignmentsTypeStyle
          selected={state.matches('allAssignments')}
          onClick={() => event({ type: 'ALL_ASSIGNMENTS' })}
        >
          Assignments Grades
        </AssignmentsTypeStyle>
      </AssignmentsTypeSelectorPanel>

      <AssignmentTypeContainer>
        {state.matches('essaysToComplete') && (
          <>
            {classworkLocked ? (
              <NoWorkContainer>
                You can only do work after class
              </NoWorkContainer>
            ) : (
              <AssignedEssaySelect />
            )}
          </>
        )}
        {state.matches('allAssignments') && <AllAssignments />}
        {state.matches('completedEssays') && <CompletedEssaySelect />}
        {state.matches('readingGuidesToComplete') && (
          <>
            {classworkLocked ? (
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
            {classTime && !isAbsent ? (
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
