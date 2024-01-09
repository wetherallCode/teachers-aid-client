import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  findQuizzesByStudentId,
  findQuizzesByStudentIdVariables,
  me_me,
  startQuiz,
  startQuizVariables,
} from '../../../../../schemaTypes'
import {
  AssignmentLink,
  AssignmentLinkLi,
  AssignmentTypeContentContainer,
  AssignmentTypeTitle,
  CompletionMessage,
} from '../state-n-styles/assignmentsStyles'
import { FIND_QUIZZES_BY_STUDENT_ID_QUERY } from '../StudentAssignments'

export type QuizSelectProps = {}

export const ACTIVATE_QUIZ_MUTATION = gql`
  mutation activateQuiz($input: ActivateQuizInput!) {
    activateQuiz(input: $input) {
      activated
    }
  }
`

export const START_QUIZ_MUTATION = gql`
  mutation startQuiz($input: StartQuizInput!) {
    startQuiz(input: $input) {
      started
    }
  }
`

export const QuizSelect = ({}: QuizSelectProps) => {
  const me: me_me = useUserContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { loading, data } = useQuery<
    findQuizzesByStudentId,
    findQuizzesByStudentIdVariables
  >(FIND_QUIZZES_BY_STUDENT_ID_QUERY, {
    variables: {
      input: {
        studentId: me._id!,
        markingPeriod: markingPeriodState.context.currentMarkingPeriod,
      },
    },
    pollInterval: 1000,
    fetchPolicy: 'network-only',
    onCompleted: (data) => console.log(data.findQuizzesByStudentId.quizzes),
    onError: (error) => console.error(error),
  })
  const [startQuiz] = useMutation<startQuiz, startQuizVariables>(
    START_QUIZ_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: [],
    },
  )
  const quizToTake = data?.findQuizzesByStudentId.quizzes.filter(
    (quiz) => quiz.assigned,
  )!

  return (
    <>
      <AssignmentTypeTitle>Quizzes to Complete</AssignmentTypeTitle>
      {loading ? null : (
        <>
          {quizToTake.length > 0 ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <AssignmentLinkLi>
                    <AssignmentLink
                      to={`quiz/toComplete/${quizToTake[0]._id}`}
                      onClick={() =>
                        !quizToTake[0].startedQuiz &&
                        startQuiz({
                          variables: {
                            input: {
                              // activate: true,
                              quizId: quizToTake[0]._id!,
                            },
                          },
                        })
                      }
                    >
                      {quizToTake[0].readings.readingSections}
                    </AssignmentLink>
                  </AssignmentLinkLi>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>No Quiz</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          )}
        </>
      )}
    </>
  )
}
