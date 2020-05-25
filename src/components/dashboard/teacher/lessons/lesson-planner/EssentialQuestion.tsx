import React, { FC } from 'react'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'
import { TextSectionQuestionsInput } from '../../../../../schemaTypes'

export type EssentialQuestionProps = {
  questionsList: TextSectionQuestionsInput[]
}

export const EssentialQuestion: FC<EssentialQuestionProps> = ({
  questionsList,
}) => {
  const [, event] = useLessonPlannerContextProvider()

  return (
    <div>
      <div>Essential Question</div>
      {questionsList.map((question, i) => (
        <div
          key={i}
          onClick={() =>
            event({ type: 'SET_ESSENTIAL_QUESTION', payload: question })
          }
        >
          {question.question}
        </div>
      ))}
    </div>
  )
}
