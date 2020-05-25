import React, { FC, useState, useEffect } from 'react'
import { TextSectionQuestionsInput } from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type QuestionSelectProps = {
  questionsList: TextSectionQuestionsInput[]
}

export const QuestionSelect: FC<QuestionSelectProps> = ({ questionsList }) => {
  const [questionSelectList, setQuestionSelectList] = useState<
    TextSectionQuestionsInput[]
  >([])
  // const [, event] = useLessonPlannerContextProvider()
  // useEffect(() => {
  //   if (questionSelectList.length > 0) {
  //     event({ type: 'SET_QUESTIONS_LIST', payload: questionSelectList })
  //   }
  // }, [questionSelectList, event])
  return (
    <div>
      <div>Questions</div>
      {questionsList.map((question, i) => (
        <div
          key={i}
          onClick={() =>
            setQuestionSelectList([...questionSelectList, question])
          }
        >
          {question.question}
        </div>
      ))}
    </div>
  )
}
