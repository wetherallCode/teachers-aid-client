import { gql, useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { finishQuizVariables, finishQuiz } from '../../../../../schemaTypes'
import { FinishedQuizContainer } from './state-n-styles/QuizStyles'
import { useQuizToCompleteContextProvider } from './state-n-styles/QuizToCompleteContext'

export type FinishQuizProps = { finished: boolean; quizId: string }

export const FINISH_QUIZ_MUTATION = gql`
  mutation finishQuiz($input: FinishQuizInput!) {
    finishQuiz(input: $input) {
      quiz {
        _id
      }
    }
  }
`

export const FinishQuiz = ({ finished, quizId }: FinishQuizProps) => {
  const [state, event] = useQuizToCompleteContextProvider()
  const navigate = useNavigate()
  const [finishQuiz] = useMutation<finishQuiz, finishQuizVariables>(
    FINISH_QUIZ_MUTATION,
    {
      variables: {
        input: {
          quizId,
          earnedPoints: +state.context.earnedPoints.toFixed(2),
          responsibilityPoints: state.context.responsibilityPoints,
        },
      },
      onCompleted: () => {
        const timer = setTimeout(() => {
          navigate('/dashboard/assignments/')
        }, 3000)
        return () => clearTimeout(timer)
      },
      refetchQueries: ['findQuizById'],
    }
  )
  let score =
    state.context.earnedPoints / state.context.quizzableSections.length

  useEffect(() => {
    if (finished) {
      finishQuiz()
    }
  }, [finished])

  return finished ? (
    <FinishedQuizContainer>
      <div>Quiz Complete</div>
      <div>Score: {(score * 100).toFixed(2)}%</div>
    </FinishedQuizContainer>
  ) : null
}
