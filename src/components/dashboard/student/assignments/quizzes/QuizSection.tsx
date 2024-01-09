import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  QuizQuestionDifficultyLevelEnum,
  findQuizQuestionsByQuizzableSections,
  findQuizQuestionsByQuizzableSectionsVariables,
  findQuizById_findQuizById_quiz,
  finishQuizVariables,
  finishQuiz,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { FINISH_QUIZ_MUTATION } from './FinishQuiz'
import { QuizQuestionDisplay } from './QuizQuestionDisplay'
import {
  FinishedQuizContainer,
  QuizMessageContainer,
} from './state-n-styles/QuizStyles'
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
          removable
        }
        associatedTextSectionId
      }
    }
  }
`

export const QuizSection = ({ quiz }: QuizSectionProps) => {
  const [state] = useQuizToCompleteContextProvider()
  const navigate = useNavigate()

  const [difficultyState, setDifficultyState] =
    useState<QuizQuestionDifficultyLevelEnum>(
      QuizQuestionDifficultyLevelEnum.DIFFICULT,
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

  const [finishQuiz] = useMutation<finishQuiz, finishQuizVariables>(
    FINISH_QUIZ_MUTATION,
    {
      variables: {
        input: {
          quizId: quiz._id!,
          earnedPoints: +state.context.earnedPoints.toFixed(2),
          responsibilityPoints: state.context.responsibilityPoints,
        },
      },
      onCompleted: () => {
        const timer = setTimeout(() => {
          navigate('/dashboard/assignments/')
        }, 5000)
        return () => clearTimeout(timer)
      },
      refetchQueries: ['findQuizById'],
    },
  )

  useEffect(() => {
    if (!quiz.isActive && !quiz.finishedQuiz && quiz.forcedFinish) {
      // finishQuiz()
    }
  }, [quiz.forcedFinish])

  let score =
    state.context.earnedPoints / state.context.quizzableSections.length

  if (loading) return null
  return (
    <>
      {/* {!quiz.isActive &&
        !quiz.finishedQuiz &&
        quiz.startedQuiz &&
        !quiz.forcedFinish && (
          <QuizMessageContainer>Getting Quiz</QuizMessageContainer>
        )} */}
      {!quiz.isActive &&
        !quiz.finishedQuiz &&
        quiz.startedQuiz &&
        !quiz.forcedFinish && (
          <QuizMessageContainer>Quiz is suspended</QuizMessageContainer>
        )}
      {!quiz.isActive &&
        quiz.finishedQuiz &&
        quiz.startedQuiz &&
        quiz.forcedFinish && (
          <FinishedQuizContainer>
            <div>
              <div>Quiz Complete</div>
              <div>Score: {(score * 100).toFixed(2)}%</div>
            </div>
          </FinishedQuizContainer>
        )}
      {quiz.isActive && !quiz.finishedQuiz && quiz.startedQuiz && (
        <>
          {data?.findQuizQuestionsByQuizzableSections.quizQuestions.length! >
            0 && (
            <QuizQuestionDisplay
              questions={
                data?.findQuizQuestionsByQuizzableSections.quizQuestions!
              }
              quizId={quiz._id!}
              difficultyState={difficultyState}
              setDifficultyState={setDifficultyState}
              markingPeriod={quiz.markingPeriod}
            />
          )}
        </>
      )}
      {quiz.finishedQuiz && !quiz.forcedFinish && (
        <FinishedQuizContainer>
          <div>Quiz Complete</div>
          <div>Score: {(score * 100).toFixed(2)}%</div>
        </FinishedQuizContainer>
      )}
    </>
  )
}
