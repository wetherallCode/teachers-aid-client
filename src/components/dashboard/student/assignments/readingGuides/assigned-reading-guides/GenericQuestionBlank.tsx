import React, { useState } from 'react'
import {
  ClarifyingQuestionsTextArea,
  ReadingGuideQuestion,
} from '../state-and-styles/readingGuideStyles'
import { NavButtons } from './NavButtons'
import { findReadingGuideById_findReadingGuideById_readingGuide_readingGuideFinal_readingGuideQuestions } from '../../../../../../schemaTypes'
import {
  ReadingGuideQuestionObjectType,
  ReadingGuideQuestionState,
} from '../state-and-styles/RadingGuideQuestionState'

export type GenericQuestionBlankProps = {
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  questionObject: ReadingGuideQuestionObjectType
  previousAnswers:
    | findReadingGuideById_findReadingGuideById_readingGuide_readingGuideFinal_readingGuideQuestions[]
    | null
    | undefined
}

export const GenericQuestionBlank = ({
  currentIndex,
  setCurrentIndex,
  questionObject,
  previousAnswers,
}: GenericQuestionBlankProps) => {
  // filter for the appropriate answer by questionType. IF questionType doesn't exist return empty string
  const previousAnswer =
    previousAnswers?.filter(
      (q) => q.questionType === questionObject.questionType
    ).length === 0
      ? ''
      : previousAnswers?.filter(
          (q) => q.questionType === questionObject.questionType
        )![0].answer

  const [answer, setAnswer] = useState<string>(
    previousAnswer! ? previousAnswer : ''
  )
  console.log(answer)
  return (
    <ReadingGuideQuestion style={{ height: '50vh' }}>
      <div style={{ gridTemplateRows: '1fr 2fr', display: 'grid' }}>
        <div
          style={{
            display: 'grid',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {questionObject.question}
        </div>
        <ClarifyingQuestionsTextArea
          value={answer}
          onChange={(e: any) => setAnswer(e.target.value)}
          autoFocus={true}
        />
        <NavButtons
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          answer={answer}
          questionType={questionObject.questionType}
        />
      </div>
    </ReadingGuideQuestion>
  )
}
