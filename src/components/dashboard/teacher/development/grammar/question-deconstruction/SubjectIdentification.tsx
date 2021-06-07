import React from 'react'
import { QuestionProps } from './QuestionDeconstruction'

export type SubjectIdentificationProps = {
  setState: React.Dispatch<
    React.SetStateAction<
      | 'question-word-removal'
      | 'helping-verb-id'
      | 'subject-predicate-split'
      | 'subject-identification'
      | 'verb-identification'
      | 'object-identification'
    >
  >
  questionToModify: string[]
  question: QuestionProps
}

export const SubjectIdentification = ({
  setState,
  question,
  questionToModify,
}: SubjectIdentificationProps) => {
  return (
    <>
      <div>{questionToModify.join(' ')}</div>
    </>
  )
}
