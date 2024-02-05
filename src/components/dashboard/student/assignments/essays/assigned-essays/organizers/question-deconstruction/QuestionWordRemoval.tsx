import React, { Dispatch, SetStateAction, useState } from 'react'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { useSelectedText } from '../../../../../../../../hooks/useSelectedText'
import { findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts } from '../../../../../../../../schemaTypes'
import { capitalizer, timeAFunction } from '../../../../../../../../utils'
import {
  RestatementDirectionsContainer,
  RestatementFeedbackContainer,
  RestatementQuestionToRestateContainer,
  SentenceToManipulate,
} from '../../state-and-styles/assignedEssayStyles'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'

export type QuestionWordRemovalProps = {
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  questionToModify: string[]
  setQuestionToModify: Dispatch<SetStateAction<string[]>>
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
}

export const QuestionWordRemoval = ({
  question,
  questionToModify,
  setQuestionToModify,
  setState,
}: QuestionWordRemovalProps) => {
  const [select, text, reset] = useSelectedText()
  const [enabled, setEnabled] = useState(true)
  const [attempts, setattempts] = useState(0)

  const handleQuestionWordRemove = (word: string) => {
    const index = questionToModify.findIndex(
      (wordToFind) => wordToFind === word,
    )
    setQuestionToModify([
      ...questionToModify.slice(0, index),
      ...questionToModify.slice(index + 1),
    ])
    setState('helping-verb-id')
  }

  const handleSelection = (word: string) => {
    const correctAnswer =
      word.toLowerCase() === question.questionWord.toLowerCase()

    if (correctAnswer) {
      setEnabled(false)
      const timer = setTimeout(() => {
        handleQuestionWordRemove(word)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setEnabled(false)
      const startTime = new Date().toISOString()

      const timer = setTimeout(
        () => {
          const endTime = new Date().toISOString()
          const timeToComplete = timeAFunction(startTime, endTime)
          reset()
          setEnabled(true)
        },
        attempts === 0 ? 5000 : 5000 + 1000 * attempts,
      )
      return () => clearTimeout(timer)
    }
  }

  return (
    <>
      <RestatementDirectionsContainer>
        <UnderlinedText>Remove Question Word</UnderlinedText>
        <div>
          Select the question word by double clicking the word you think is the
          question word in the sentence below.
        </div>
      </RestatementDirectionsContainer>

      <>
        {enabled ? (
          <RestatementQuestionToRestateContainer>
            <SentenceToManipulate
              cursorFormat={enabled ? 'POINTER' : 'NONE'}
              onMouseUp={(e) => (enabled ? select() : e.preventDefault())}
              onSelect={(e) => !enabled && e.preventDefault()}
            >
              {questionToModify.map((word, i: number) => (
                <span key={i}>
                  <span
                    onDoubleClick={() => {
                      enabled && setattempts((a) => a + 1)
                      enabled && handleSelection(word)
                    }}
                    onSelect={() => {
                      enabled && setattempts((a) => a + 1)
                      enabled && handleSelection(word)
                    }}
                  >
                    {word === questionToModify[0] ? capitalizer(word) : word}
                  </span>
                  {word !== questionToModify[questionToModify.length - 2] && (
                    <span> </span>
                  )}
                </span>
              ))}
            </SentenceToManipulate>
          </RestatementQuestionToRestateContainer>
        ) : (
          <>
            {text && (
              <RestatementFeedbackContainer
                correct={
                  text.toLowerCase() === question.questionWord.toLowerCase()
                }
              >
                <UnderlinedText>Feedback</UnderlinedText>
                {text.toLowerCase() !== question.questionWord.toLowerCase() ? (
                  <div>
                    "{capitalizer(text)}" is not the question word. It is either
                    How or Why. Try it again!
                  </div>
                ) : (
                  <div>That's it! Good Job!</div>
                )}
              </RestatementFeedbackContainer>
            )}
          </>
        )}
      </>
    </>
  )
}
