import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import {
  findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList,
  QuizQuestionDifficultyLevelEnum,
  findQuizQuestionsByQuizzableSections,
  findQuizQuestionsByQuizzableSectionsVariables,
  findQuizById_findQuizById_quiz,
} from '../../../../../schemaTypes'
import { QuizQuestionDisplay } from './QuizQuestionDisplay'
import { QuizMessageContainer } from './state-n-styles/QuizStyles'
import { useQuizToCompleteContextProvider } from './state-n-styles/QuizToCompleteContext'

export type QuizSectionProps = { quiz: findQuizById_findQuizById_quiz }

export const FIND_QUIZ_QUESTIONS_QUERY = gql`
  query findQuizQuestionsByQuizzableSections(
    $input: FindQuizQuestionsByQuizzableSectionsInput!
  ) {
    findQuizQuestionsByQuizzableSections(input: $input) {
      quizQuestions {
        _id
        difficultyLevel
        questionType
        question
        answerList {
          answer
          correct
          partiallyCorrect
        }
        associatedTextSectionId
      }
    }
  }
`

export const QuizSection = ({ quiz }: QuizSectionProps) => {
  const [state, event] = useQuizToCompleteContextProvider()
  const [answerValue, setAnswerValue] =
    useState<findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList | null>(
      null
    )
  const { quizQuestionDifficultyLevelEnum } = useEnumContextProvider()
  const [difficultyState, setDifficultyState] =
    useState<QuizQuestionDifficultyLevelEnum>(
      QuizQuestionDifficultyLevelEnum.DIFFICULT
    )

  const { loading, data } = useQuery<
    findQuizQuestionsByQuizzableSections,
    findQuizQuestionsByQuizzableSectionsVariables
  >(FIND_QUIZ_QUESTIONS_QUERY, {
    variables: {
      input: { quizzableSectionIds: state.context.quizzableSections },
    },
    // onCompleted: (data) =>
    // console.log(data.findQuizQuestionsByQuizzableSections.quizQuestions),
    onError: (error) => console.error(error),
  })

  if (loading) return null
  return (
    <>
      {!quiz.isActive && !quiz.finishedQuiz ? (
        <QuizMessageContainer>Quiz is suspended</QuizMessageContainer>
      ) : (
        <>
          {data?.findQuizQuestionsByQuizzableSections.quizQuestions.length! >
            0 && (
            <QuizQuestionDisplay
              questions={
                data?.findQuizQuestionsByQuizzableSections.quizQuestions!
              }
              quizId={quiz._id!}
            />
          )}
        </>
      )}
    </>
  )
}
