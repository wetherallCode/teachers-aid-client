import React from 'react'
import {
  ReadingGuideButtonArea,
  ReadingGuideQuestionNavButtons,
} from '../state-and-styles/readingGuideStyles'
import {
  UPDATE_READING_GUIDE_MUTATION_New,
  updateReadingGuideNewType,
} from './CompleteReadingGuideNew'
import { useReadingGuideToCompleteContextProvider } from '../state-and-styles/ReadingGuideToCompleteContext'
import { useMutation } from '@apollo/client'
import {
  updateReadingGuide,
  updateReadingGuideVariables,
} from '../../../../../../schemaTypes'
import { ReadingGuideQuestionState } from '../state-and-styles/RadingGuideQuestionState'

export type NavButtonsProps = {
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  answer: string
  questionType: ReadingGuideQuestionState
}

export const NavButtons = ({
  currentIndex,
  setCurrentIndex,
  answer,
  questionType,
}: NavButtonsProps) => {
  const [state] = useReadingGuideToCompleteContextProvider()

  const [updateReadingGuideNew] = useMutation<
    updateReadingGuide,
    updateReadingGuideVariables
  >(UPDATE_READING_GUIDE_MUTATION_New, {
    variables: {
      input: {
        readingGuideId: state.context.updateReadingGuideInputs.readingGuideId,
        answer,
        questionType,
      },
    },
    onCompleted: (data) => 'updated',
    refetchQueries: ['findReadingGuideById'],
  })

  return (
    <>
      {currentIndex === 0 ? (
        <ReadingGuideButtonArea>
          <ReadingGuideQuestionNavButtons
            onClick={() => updateReadingGuideNew()}
          >
            Save
          </ReadingGuideQuestionNavButtons>
          <ReadingGuideQuestionNavButtons
            style={
              answer === ''
                ? { background: 'var(--red)' }
                : { background: 'var(--blue)' }
            }
            onClick={() => {
              setCurrentIndex((c) => c + 1)
              updateReadingGuideNew()
            }}
            disabled={answer === '' ? true : false}
          >
            {answer === '' ? 'No Answer' : 'Next'}
          </ReadingGuideQuestionNavButtons>
        </ReadingGuideButtonArea>
      ) : (
        <ReadingGuideButtonArea>
          <ReadingGuideQuestionNavButtons
            onClick={() => {
              setCurrentIndex((c) => c - 1)
              updateReadingGuideNew()
            }}
          >
            Back
          </ReadingGuideQuestionNavButtons>
          <ReadingGuideQuestionNavButtons
            onClick={() => updateReadingGuideNew()}
          >
            Save
          </ReadingGuideQuestionNavButtons>
          <ReadingGuideQuestionNavButtons
            style={
              answer === ''
                ? { background: 'var(--red)' }
                : { background: 'var(--blue)' }
            }
            onClick={() => {
              setCurrentIndex((c) => c + 1)
              updateReadingGuideNew()
            }}
            disabled={answer === '' ? true : false}
          >
            {answer === '' ? 'No Answer' : 'Next'}
          </ReadingGuideQuestionNavButtons>
        </ReadingGuideButtonArea>
      )}
    </>
  )
}
