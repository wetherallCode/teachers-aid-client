import React, { Dispatch, SetStateAction, useState } from 'react'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import {
  findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions,
  findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList,
  MarkingPeriodEnum,
  QuizQuestionDifficultyLevelEnum,
  QuizQuestionTypeEnum,
} from '../../../../../schemaTypes'
import { FinishQuiz } from './FinishQuiz'
import { multipleChoiceGrader, trueFalseGrader } from './quizQuestionGrader'
import {
  QuestionBlankContainer,
  QuizQuestionAnswerInput,
  QuizQuestionAnswerLabelContainer,
  QuizQuestionAnswersContainer,
  QuizQuestionContainer,
  QuizQuestionSubmitContainer,
  SubmitButton,
} from './state-n-styles/QuizStyles'
import { useQuizToCompleteContextProvider } from './state-n-styles/QuizToCompleteContext'

export type QuestionBlankProps = {
  quizId: string
  question: string
  questionType: QuizQuestionTypeEnum
  answers: findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList[]
  difficultyState: QuizQuestionDifficultyLevelEnum
  setDifficultyState: Dispatch<SetStateAction<QuizQuestionDifficultyLevelEnum>>
  currentQuizQuestion: findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions
  markingPeriod: MarkingPeriodEnum
}

export const QuestionBlank = ({
  question,
  questionType,
  answers,
  setDifficultyState,
  difficultyState,
  currentQuizQuestion,
  quizId,
  markingPeriod,
}: QuestionBlankProps) => {
  const [state, event] = useQuizToCompleteContextProvider()
  const [finished, setFinished] = useState(false)
  const { quizQuestionDifficultyLevelEnum } = useEnumContextProvider()
  const [answerValue, setAnswerValue] =
    useState<findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList | null>(
      null,
    )

  const handleFinished = () => {
    setFinished(true)
  }
  const handleSubmit = () => {
    if (answerValue) {
      if (currentQuizQuestion!.questionType === 'MULTIPLE_CHOICE') {
        const { points, earnedPoints } = multipleChoiceGrader({
          answer: answerValue,
          difficultyLevel:
            quizQuestionDifficultyLevelEnum.findIndex(
              (i: QuizQuestionDifficultyLevelEnum) =>
                i === currentQuizQuestion!.difficultyLevel,
            ) + 1,
        })

        event({
          type: 'ADD_EARNED_POINTS',
          payload: earnedPoints,
        })
        event({ type: 'ADD_RESPONSIBILITY_POINTS', payload: points })
        event({ type: 'NEXT_QUESTION_NUMBER' })

        if (answerValue?.correct) {
          if (
            state.context.currentQuizzableSection ===
            state.context.quizzableSections[
              state.context.quizzableSections.length - 1
            ]
          ) {
            handleFinished()
          } else {
            setAnswerValue(null)
            setDifficultyState(QuizQuestionDifficultyLevelEnum.DIFFICULT)
            event({ type: 'NEXT_QUIZZABLE_SECTION' })
          }
        } else {
          const currentDifficulty = quizQuestionDifficultyLevelEnum.findIndex(
            (i: QuizQuestionDifficultyLevelEnum) => i === difficultyState,
          )
          if (currentDifficulty === 0) {
            if (
              state.context.currentQuizzableSection ===
              state.context.quizzableSections[
                state.context.quizzableSections.length - 1
              ]
            ) {
              handleFinished()
            } else {
              setDifficultyState(QuizQuestionDifficultyLevelEnum.DIFFICULT)
              setAnswerValue(null)
              event({ type: 'NEXT_QUIZZABLE_SECTION' })
            }
          } else {
            setAnswerValue(null)
            setDifficultyState(
              quizQuestionDifficultyLevelEnum[currentDifficulty - 1],
            )
          }
        }
      }

      if (currentQuizQuestion!.questionType === 'TRUE_FALSE') {
        const { points, earnedPoints } = trueFalseGrader({
          answer: answerValue,
          difficultyLevel:
            quizQuestionDifficultyLevelEnum.findIndex(
              (i: QuizQuestionDifficultyLevelEnum) =>
                i === currentQuizQuestion!.difficultyLevel,
            ) + 1,
        })

        event({
          type: 'ADD_EARNED_POINTS',
          payload: earnedPoints,
        })

        event({ type: 'ADD_RESPONSIBILITY_POINTS', payload: points })
        event({ type: 'NEXT_QUESTION_NUMBER' })
        if (answerValue?.correct) {
          if (
            state.context.currentQuizzableSection ===
            state.context.quizzableSections[
              state.context.quizzableSections.length - 1
            ]
          ) {
            handleFinished()
          } else {
            setDifficultyState(QuizQuestionDifficultyLevelEnum.DIFFICULT)
            setAnswerValue(null)
            event({ type: 'NEXT_QUIZZABLE_SECTION' })
          }
        } else {
          const currentDifficulty = quizQuestionDifficultyLevelEnum.findIndex(
            (i: QuizQuestionDifficultyLevelEnum) => i === difficultyState,
          )
          if (currentDifficulty === 0) {
            if (
              state.context.currentQuizzableSection ===
              state.context.quizzableSections[
                state.context.quizzableSections.length - 1
              ]
            ) {
              handleFinished()
            } else {
              setDifficultyState(QuizQuestionDifficultyLevelEnum.DIFFICULT)
              setAnswerValue(null)
              event({ type: 'NEXT_QUIZZABLE_SECTION' })
            }
          } else {
            setAnswerValue(null)
            setDifficultyState(
              quizQuestionDifficultyLevelEnum[currentDifficulty - 1],
            )
          }
        }
      }
    } else return null
  }

  return (
    <QuestionBlankContainer onSubmit={(e) => e.preventDefault()}>
      {!finished ? (
        <>
          <QuizQuestionContainer>
            {state.context.questionNumber}. {question}
          </QuizQuestionContainer>
          {questionType === QuizQuestionTypeEnum.MULTIPLE_CHOICE && (
            <QuizQuestionAnswersContainer>
              {answers.map((answer, i) => {
                return (
                  <QuizQuestionAnswerLabelContainer key={answer.answer}>
                    <QuizQuestionAnswerInput
                      type="radio"
                      checked={answerValue === answer}
                      value={answer.answer}
                      onChange={() => setAnswerValue(answer)}
                    />
                    {answer.answer}
                  </QuizQuestionAnswerLabelContainer>
                )
              })}
            </QuizQuestionAnswersContainer>
          )}
          {questionType === QuizQuestionTypeEnum.TRUE_FALSE && (
            <QuizQuestionAnswersContainer>
              {answers
                .sort((x, y) => (x.answer < y.answer ? 1 : -1)) // sorts out True then False
                .map((answer, i) => {
                  return (
                    <QuizQuestionAnswerLabelContainer key={i}>
                      <QuizQuestionAnswerInput
                        type="radio"
                        checked={answerValue === answer}
                        onChange={() => setAnswerValue(answer)}
                      />
                      {answer.answer}
                    </QuizQuestionAnswerLabelContainer>
                  )
                })}
            </QuizQuestionAnswersContainer>
          )}
          <QuizQuestionSubmitContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Submit
            </SubmitButton>
          </QuizQuestionSubmitContainer>
        </>
      ) : (
        <>
          <div></div>
          <FinishQuiz
            finished={finished}
            quizId={quizId}
            markingPeriod={markingPeriod}
          />
        </>
      )}
    </QuestionBlankContainer>
  )
}
