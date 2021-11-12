import { useMutation } from '@apollo/client'
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  activateQuizVariables,
  activateQuiz,
  findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions,
  findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList,
  QuizQuestionDifficultyLevelEnum,
  QuizQuestionTypeEnum,
  me_me_Student,
} from '../../../../../schemaTypes'
import { QuestionBlank } from './QuestionBlank'
import { ACTIVATE_QUIZ_MUTATION } from './QuizSelect'
import { useQuizToCompleteContextProvider } from './state-n-styles/QuizToCompleteContext'

export type QuizQuestionDisplayProps = {
  questions: findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions[]
  quizId: string
  difficultyState: QuizQuestionDifficultyLevelEnum
  setDifficultyState: Dispatch<SetStateAction<QuizQuestionDifficultyLevelEnum>>
}

// User has switched away from the tab (AKA tab is hidden)

export const QuizQuestionDisplay = ({
  questions,
  quizId,
  difficultyState,
  setDifficultyState,
}: QuizQuestionDisplayProps) => {
  const me: me_me_Student = useUserContextProvider()
  const [state, event] = useQuizToCompleteContextProvider()

  const [windowWidth, setwindowWidth] = useState(window.innerWidth)

  const [activateQuiz] = useMutation<activateQuiz, activateQuizVariables>(
    ACTIVATE_QUIZ_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: [],
    }
  )
  const onFocus = () => {
    activateQuiz({
      variables: {
        input: {
          activate: false,
          quizId: quizId,
        },
      },
    })
  }
  const onBlur = () => {
    activateQuiz({
      variables: {
        input: {
          activate: false,
          quizId: quizId,
        },
      },
    })
  }

  const onResize = () => {
    activateQuiz({
      variables: {
        input: {
          activate: false,
          quizId: quizId,
        },
      },
    })
  }
  const WindowFocusHandler = () => {
    const width = window.innerWidth
    useEffect(() => {
      window.addEventListener('focus', onFocus)
      window.addEventListener('blur', onBlur)
      window.addEventListener('resize', onResize)

      // Specify how to clean up after this effect:
      return () => {
        window.removeEventListener('focus', onFocus)
        window.removeEventListener('blur', onBlur)
        window.removeEventListener('resize', onResize)
      }
    }, [width])

    return null
  }

  WindowFocusHandler()
  const [answerValue, setAnswerValue] =
    useState<findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList | null>(
      null
    )

  const quizQuestions = questions.filter(
    (section) =>
      section.associatedTextSectionId === state.context.currentQuizzableSection
  )!

  const [currentQuizQuestion] = quizQuestions.filter(
    (question) => question.difficultyLevel === difficultyState
  )!

  const answers = me.hasIEP
    ? currentQuizQuestion!.answerList.filter((answer) => !answer.removable)
    : [...currentQuizQuestion!.answerList]

  function shuffleAnswerList(array: any) {
    return array.sort(() => Math.random() - 0.5)
  }
  const randomizedAnswers = shuffleAnswerList(
    answers
  ) as findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList[]

  return (
    <QuestionBlank
      answers={
        currentQuizQuestion.questionType ===
        QuizQuestionTypeEnum.MULTIPLE_CHOICE
          ? randomizedAnswers
          : answers.sort((answer) => (answer.answer === 'True' ? 1 : 0))
      }
      currentQuizQuestion={currentQuizQuestion}
      difficultyState={difficultyState}
      setDifficultyState={setDifficultyState}
      question={currentQuizQuestion.question}
      questionType={currentQuizQuestion.questionType}
      quizId={quizId}
    />
  )
}
