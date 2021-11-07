import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router'
import { findQuizById, findQuizByIdVariables } from '../../../../../schemaTypes'
import { QuizSection } from './QuizSection'
import { QuizContainer, QuizTitleContainer } from './state-n-styles/QuizStyles'
import { useQuizToCompleteContextProvider } from './state-n-styles/QuizToCompleteContext'

export type QuizToCompleteProps = {}

export const FIND_QUIZ_BY_ID_QUERY = gql`
  query findQuizById($input: FindQuizByIdInput!) {
    findQuizById(input: $input) {
      quiz {
        _id
        finishedQuiz
        startedQuiz
        forcedFinish
        isActive
        quizzableSections
        readings {
          readingSections
        }
      }
    }
  }
`

export const QuizToComplete = ({}: QuizToCompleteProps) => {
  const [, event] = useQuizToCompleteContextProvider()
  const params = useParams()
  const { loading, data } = useQuery<findQuizById, findQuizByIdVariables>(
    FIND_QUIZ_BY_ID_QUERY,
    {
      variables: {
        input: { quizId: params.quizToComplete },
      },
      onCompleted: (data) => {
        event({
          type: 'SET_QUIZZABLE_SECTIONS',
          payload: data?.findQuizById.quiz.quizzableSections,
        })
        event({
          type: 'SET_INITIAL_QUIZZABLE_SECTION',
          payload: data.findQuizById.quiz.quizzableSections[0],
        })
      },
      pollInterval: 1000,
      onError: (error) => console.error(error),
    }
  )

  if (loading) return <div>Loading </div>
  return (
    <QuizContainer>
      <QuizTitleContainer>
        {data?.findQuizById.quiz.readings.readingSections} Quiz
      </QuizTitleContainer>
      <QuizSection quiz={data?.findQuizById.quiz!} />
    </QuizContainer>
  )
}
