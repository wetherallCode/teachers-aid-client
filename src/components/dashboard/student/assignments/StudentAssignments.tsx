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
} from '../../../../schemaTypes'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { gql, useQuery } from '@apollo/client'
import { QuizSelect } from './quizzes/QuizSelect'

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
      }
    }
  }
`

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
  const me: me_me = useUserContextProvider()
  const [state, event] = useStudentAssignmentContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context
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
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  // if (loading) return <div>Loading </div>
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
        {state.matches('essaysToComplete') && <AssignedEssaySelect />}
        {state.matches('completedEssays') && <CompletedEssaySelect />}
        {state.matches('readingGuidesToComplete') && (
          <AssignedReadingGuideSelect />
        )}
        {state.matches('articleReviewsToComplete') && <ArticleReviewSelect />}
        {state.matches('quizzes') && <QuizSelect />}
        <MarkingPeriodSelector />
      </AssignmentTypeContainer>
    </AssignmentsToCompleteContainer>
  )
}
