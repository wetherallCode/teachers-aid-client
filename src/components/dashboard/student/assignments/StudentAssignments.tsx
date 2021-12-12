import React, { FC, useEffect } from 'react'
import { AssignedEssaySelect } from './essays/assigned-essays/AssignedEssaySelect'
import { CompletedEssaySelect } from './essays/completed-essays/CompletedEssaySelect'
import { AssignedReadingGuideSelect } from './readingGuides/AssignedReadingGuideSelect'
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

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const [state, event] = useStudentAssignmentContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const [currentSchoolDayState] = useSchoolDayContextProvider()

  const { currentMarkingPeriod } = markingPeriodState.context
  const { dateTime } = useTime()
  // const fakeCurrentMarkingPeriod = MarkingPeriodEnum.SECOND
  // useEffect(() => {
  //   event({ type: 'SET_MARKING_PERIOD', payload: fakeCurrentMarkingPeriod })
  // }, [])
  const { loading, data } = useQuery<
    findQuizzesByStudentId,
    findQuizzesByStudentIdVariables
  >(FIND_QUIZZES_BY_STUDENT_ID_QUERY, {
    variables: {
      input: { markingPeriod: currentMarkingPeriod, studentId: me._id! },
    },
    pollInterval: 1000,
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const assignmentsInClassNotAllowed = true

  const { schoolDayLength } = currentSchoolDayState.context.currentSchoolDay

  const classTime =
    assignmentsInClassNotAllowed &&
    Date.parse(dateTime) >
      Date.parse(
        timeFinder(
          schoolDayLength === SchoolDayLengthEnum.HALF
            ? me.inCourses[0].hasCourseInfo?.halfDayStartsAt!
            : me.inCourses[0].hasCourseInfo?.startsAt!
        )
      ) &&
    Date.parse(dateTime) <
      Date.parse(
        timeFinder(
          schoolDayLength === SchoolDayLengthEnum.HALF
            ? me.inCourses[0].hasCourseInfo?.halfDayEndsAt!
            : me.inCourses[0].hasCourseInfo?.endsAt!
        )
      )

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
            {!classTime ? (
              <AssignedEssaySelect />
            ) : (
              <NoWorkContainer>
                You can only do work after class
              </NoWorkContainer>
            )}
          </>
        )}
        {state.matches('completedEssays') && <CompletedEssaySelect />}
        {state.matches('readingGuidesToComplete') && (
          <>
            {!classTime ? (
              <AssignedReadingGuideSelect />
            ) : (
              <NoWorkContainer>
                You can only do work after class
              </NoWorkContainer>
            )}
          </>
        )}
        {state.matches('articleReviewsToComplete') && (
          <>
            {!classTime ? (
              <ArticleReviewSelect />
            ) : (
              <NoWorkContainer>
                You can only do work after class
              </NoWorkContainer>
            )}
          </>
        )}
        {state.matches('quizzes') && <QuizSelect />}
        <MarkingPeriodSelector />
      </AssignmentTypeContainer>
    </AssignmentsToCompleteContainer>
  )
}
