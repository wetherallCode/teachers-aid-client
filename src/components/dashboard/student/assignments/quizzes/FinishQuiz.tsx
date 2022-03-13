import { gql, useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useGradeCalculator } from '../../../../../hooks/useGradeCalculator'
import {
  finishQuizVariables,
  finishQuiz,
  me_me,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { responsibilityPointConverter } from '../../../../../utils'
import { FinishedQuizContainer } from './state-n-styles/QuizStyles'
import { useQuizToCompleteContextProvider } from './state-n-styles/QuizToCompleteContext'

export type FinishQuizProps = {
  finished: boolean
  quizId: string
  markingPeriod: MarkingPeriodEnum
}

export const FINISH_QUIZ_MUTATION = gql`
  mutation finishQuiz($input: FinishQuizInput!) {
    finishQuiz(input: $input) {
      quiz {
        _id
      }
    }
  }
`

export const FinishQuiz = ({
  finished,
  quizId,
  markingPeriod,
}: FinishQuizProps) => {
  const [state, event] = useQuizToCompleteContextProvider()

  const me: me_me = useUserContextProvider()
  const navigate = useNavigate()
  const { grade } = useGradeCalculator({
    studentId: me._id!,
    markingPeriod: markingPeriod,
    polling: false,
  })
  const [finishQuiz] = useMutation<finishQuiz, finishQuizVariables>(
    FINISH_QUIZ_MUTATION,
    {
      variables: {
        input: {
          quizId,
          earnedPoints: +state.context.earnedPoints.toFixed(2),
          // responsibilityPoints: state.context.responsibilityPoints,
          responsibilityPoints: responsibilityPointConverter(
            grade,
            state.context.responsibilityPoints
          ),
        },
      },
      onCompleted: () => {
        const timer = setTimeout(() => {
          navigate('/dashboard/assignments/')
        }, 5000)
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
