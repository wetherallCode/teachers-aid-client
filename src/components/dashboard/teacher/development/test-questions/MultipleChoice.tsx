import React from 'react'
import { QuestionBlank } from './QuestionBlank'
import { TestTypes } from './Tests'

export type MultipleChoiceProps = {}

export type AnswerProps = {
  type: TestTypes
  answer: string
  correct: boolean
  partiallyCorrect: boolean
}

export type QuestionProps = {
  question: string
  answerList: AnswerProps[]
  questionDifficultyLevel: number
  textSectionId: string
  lessonId: string
}

export const MultipleChoice = ({}: MultipleChoiceProps) => {
  const question: QuestionProps = {
    question: 'Why did the chicken cross the road?',
    questionDifficultyLevel: 3,
    textSectionId: '1',
    lessonId: '',
    answerList: [
      {
        type: 'multipleChoice',
        answer: 'Correct Answer',
        correct: true,
        partiallyCorrect: false,
      },
      {
        type: 'multipleChoice',
        answer: 'Partially Correct Answer',
        correct: false,
        partiallyCorrect: true,
      },
      {
        type: 'multipleChoice',
        answer: 'Wrong Answer One',
        correct: false,
        partiallyCorrect: false,
      },
      {
        type: 'multipleChoice',
        answer: 'Wrong Answer Two',
        correct: false,
        partiallyCorrect: false,
      },
    ],
  }

  // function shuffle(array: any) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1))

  //     return ([array[i], array[j]] = [array[j], array[i]])
  //   }
  // }

  // console.log(shuffle(answerList))
  function shuffleAnswerList(array: AnswerProps[]) {
    return array.sort(() => Math.random() - 0.5)
  }

  const randomizedAnswers = shuffleAnswerList(question.answerList)

  return (
    <div style={{ display: 'grid' }}>
      <QuestionBlank
        questionNumber={1}
        question={question}
        answerList={randomizedAnswers}
      />
    </div>
  )
}
