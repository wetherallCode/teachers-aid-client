import React, { useState } from 'react'
import { AnswerProps, QuestionProps } from './MultipleChoice'
import { multipleChoiceGrader } from './multipleChoiceGrader'

export type QuestionBlankProps = {
  questionNumber: number
  question: QuestionProps
  answerList: AnswerProps[]
}

export const QuestionBlank = ({
  questionNumber,
  question,
  answerList,
}: QuestionBlankProps) => {
  const [answerValue, setAnswerValue] = useState<AnswerProps | null>(null)

  const { points } = multipleChoiceGrader({
    answer: answerValue,
    difficultyLevel: question.questionDifficultyLevel,
  })
  const handleSubmit = () => {}
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        {questionNumber}. {question.question}
      </div>
      <div style={{ display: 'grid', gridAutoFlow: 'row' }}>
        {answerList.map((answer, i) => {
          return (
            <label key={i}>
              <input
                type='radio'
                checked={answerValue === answer}
                onChange={() => setAnswerValue(answer)}
              />
              {answer.answer}
            </label>
          )
        })}
      </div>
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </form>
  )
}
