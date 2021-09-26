import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { useSelectedText } from '../../../../../../../../hooks/useSelectedText'
import { findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts } from '../../../../../../../../schemaTypes'
import {
  capitalizer,
  irregularPastTenseVerbList,
} from '../../../../../../../../utils'
import { LineToManipulate } from '../../../../../../teacher/development/grammar/question-deconstruction/VerbIdentification'
import {
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  RestatementDirectionsContainer,
  RestatementFeedbackContainer,
  RestatementQuestionToRestateContainer,
  SentenceToManipulate,
} from '../../state-and-styles/assignedEssayStyles'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'

export type HelpingVerbIdentificationProps = {
  questionToModify: string[]
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  setQuestionToModify: Dispatch<SetStateAction<string[]>>
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
  auxilaryVerbCheck: boolean
}

export const HelpingVerbIdentification = ({
  questionToModify,
  setQuestionToModify,
  setState,
  question,
  auxilaryVerbCheck,
}: HelpingVerbIdentificationProps) => {
  const [select, text, reset] = useSelectedText()
  const [attempts, setattempts] = useState(0)
  const [enabled, setEnabled] = useState(true)
  const [point, setPoint] = useState<number | null>(null)
  let wordToCheck = text

  const removeDidHandler = (word: string) => {
    const index = questionToModify.findIndex(
      (wordToFind) => wordToFind === word
    )
    const sentenceToModify = questionToModify
      .join(' ')
      .replace('?', '.')
      // .replace(question.simplePredicate, irregularPastTenseVerbList())
      .split(' ')

    setQuestionToModify([
      ...sentenceToModify.slice(0, index),
      ...sentenceToModify.slice(index + 1),
    ])

    setTimeout(() => {
      setState('subject-predicate-split')
    }, 3000)
  }

  const moveBeingWord = (word: string) => {
    if (word === 'was' || word === 'were') {
      const index = questionToModify.findIndex(
        (wordToFind) => wordToFind === word
      )

      const predicateIndex = questionToModify.findIndex(
        (i) => i === question.completePredicate.split(' ')[0]
      )

      const sentenceToModify = questionToModify
        .join(' ')
        .replace('?', '.')
        .split(' ')

      setQuestionToModify([
        ...sentenceToModify.slice(0, index),
        ...sentenceToModify.slice(index + 1, predicateIndex),
        word,
        ...sentenceToModify.slice(predicateIndex),
      ])
      setTimeout(() => {
        setState('subject-predicate-split')
      }, 3000)
    }
  }

  const newSentence = [
    questionToModify.join(' ').split('').slice(0, point!).join(''),
    question.helpingVerb,
    questionToModify
      .join(' ')
      .split('')
      .slice(point!, questionToModify.join(' ').split('').length)
      .join(''),
  ]

  const correctSentence =
    question.helpingVerb +
      ' ' +
      questionToModify
        .join(' ')
        .split('')
        .slice(point!, questionToModify.join(' ').split('').length)
        .join('') ===
    question.helpingVerb + ' ' + question.completePredicate

  const helpingVerbCheck = (word: string) => {
    if (word === question.helpingVerb && question.helpingVerb === 'did') {
      removeDidHandler(word)
    } else if (word === question.helpingVerb) {
      moveBeingWord(word)
    } else {
      setEnabled(false)
      const timer = setTimeout(
        () => {
          reset()
          setEnabled(true)
        },
        // attempts === 0 ? 3000 : 3000 + 1000 * attempts
        3000
      )
      return () => clearTimeout(timer)
    }
  }

  useEffect(() => {
    if (point && !correctSentence) {
      const timer = setTimeout(() => {
        setPoint(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
    if (point && correctSentence) {
      setQuestionToModify(newSentence.join(' ').split(' '))
      setTimeout(() => {
        setState('subject-identification')
      }, 3000)
    }
  }, [point, correctSentence])

  return (
    <>
      <>
        <RestatementDirectionsContainer>
          <UnderlinedText>Helping Verb Identification</UnderlinedText>
          Since the helping verb is "{question.helpingVerb},"{' '}
          {question.helpingVerb !== 'did'
            ? `it needs to be moved after the subject of the sentence. `
            : `you don't need it
          in the sentence anymore. Double click to remove the word.`}{' '}
          {question.helpingVerb !== 'did' &&
            `Double click to have "${question.helpingVerb}" moved to the correct place in the sentence.`}
        </RestatementDirectionsContainer>
        <RestatementQuestionToRestateContainer>
          <SentenceToManipulate
            cursorFormat={enabled ? 'POINTER' : 'NONE'}
            onMouseUp={(e) => (enabled ? select() : e.preventDefault())}
            onSelect={(e) => !enabled && e.preventDefault()}
          >
            {questionToModify
              .join(' ')
              .split(' ')
              .includes(question.helpingVerb) ? (
              questionToModify.map((word, i: number) => (
                <span key={i}>
                  <span
                    onDoubleClick={() => {
                      enabled && helpingVerbCheck(word.toLowerCase())
                      enabled && setattempts((a) => a + 1)
                    }}
                  >
                    {word === questionToModify[0] ? capitalizer(word) : word}
                  </span>
                  {word !== questionToModify[questionToModify.length - 2] && (
                    <span> </span>
                  )}
                </span>
              ))
            ) : (
              <div>
                {questionToModify
                  .slice(0, questionToModify.length - 1)
                  .join(' ') +
                  questionToModify
                    .slice(questionToModify.length - 1)
                    .join('')
                    .replace('?', '.')}
              </div>
            )}
          </SentenceToManipulate>
        </RestatementQuestionToRestateContainer>
        {wordToCheck && (
          <RestatementFeedbackContainer
            correct={wordToCheck.toLowerCase() === question.helpingVerb}
          >
            <UnderlinedText>Feedback</UnderlinedText>
            {wordToCheck.toLowerCase() !== question.helpingVerb ? (
              <div>
                "{capitalizer(wordToCheck)}" is not the word "
                {question.helpingVerb}". Double click the word "
                {question.helpingVerb}" please.
              </div>
            ) : (
              <div>That's it! Good Job!</div>
            )}
          </RestatementFeedbackContainer>
        )}
      </>
    </>
  )
}
