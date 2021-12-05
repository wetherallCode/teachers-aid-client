import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts } from '../../../../../../../../schemaTypes'
import {
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  RestatementDirectionsContainer,
  RestatementFeedbackContainer,
  RestatementSplitter,
} from '../../state-and-styles/assignedEssayStyles'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { subjectPredicateGrading } from './subjectPredicateGrading'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'
import {
  sentenceCapitalizer,
  timeAFunction,
} from '../../../../../../../../utils'

export type SubjectPredicateSplitProps = {
  questionToModify: string[]
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  setQuestionToModify: Dispatch<SetStateAction<string[]>>
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
  auxilaryVerbCheck: boolean
}

export const SubjectPredicateSplit = ({
  questionToModify,
  setQuestionToModify,
  setState,
  question,
  auxilaryVerbCheck,
}: SubjectPredicateSplitProps) => {
  const [point, setPoint] = useState<number | null>(null)
  const [attempt, setAttempt] = useState(0)

  const separator = ' | '

  let sentence = [
    ...questionToModify.slice(0, questionToModify.length - 2),
    questionToModify[questionToModify.length - 2] + '.',
  ].join(' ')

  const newSentence = [
    sentence.slice(0, point!).trim(),
    separator,
    sentence.slice(point!, sentence.length).trim(),
  ]

  const { message, correct, whatWentWrong, howToFix } = subjectPredicateGrading(
    {
      correctSubject: question.completeSubject,
      givenSubject:
        question.helpingVerb === 'did' || auxilaryVerbCheck
          ? newSentence[0]
          : newSentence[0].split(' ').join(' '),
      givenPredicate: newSentence[2],
      sentence,
      noun: question.simpleSubject.split(' '),
      compoundNoun: question.compoundNoun,
      nounType: question.nounType,
      verb: question.simplePredicate,
      verbType: question.verbType,
      helpingVerb: question.helpingVerb,
    }
  )

  useEffect(() => {
    if (point && correct) {
      const timer = setTimeout(() => {
        const sentenceToPass = (
          newSentence.join(' ').split(' ')[0].charAt(0).toUpperCase() +
          newSentence.join(' ').slice(1)
        ).split(' ')
        setQuestionToModify(sentenceToPass)
        setState('subject-identification')
      }, 6000)
      return () => {
        clearTimeout(timer)
      }
    }
    const startTime = new Date().toISOString()
    const timer = setTimeout(
      () => {
        setPoint(null)
        const endTime = new Date().toISOString()
        const timeToComplete = timeAFunction(startTime, endTime)
      },
      attempt < 1 ? 4000 : 4000 + attempt * 1000
      // 3000
    )
    return () => {
      clearTimeout(timer)
    }
  }, [point])

  const correctSubject = newSentence[0]

  return (
    <>
      <>
        <RestatementDirectionsContainer>
          <UnderlinedText>Split the Subject from the Predicate</UnderlinedText>
          Every sentence can be split into two parts: the subject and the
          predicate. Click (or tap) on the sentence below to separate it into
          the subject and predicate. The subject will be on the left side with a
          single underline, and the predicate will be on the right side with
          double underline.
        </RestatementDirectionsContainer>
        {point ? (
          <RestatementSplitter
            cursorFormat={point && !correct ? 'NONE' : 'POINTER'}
          >
            {newSentence.map((part, i) => {
              return (
                <span
                  key={i}
                  style={
                    i === 0
                      ? {
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          textUnderlinePosition: 'under',
                        }
                      : i === 2
                      ? {
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          textDecorationStyle: 'double',
                          textUnderlinePosition: 'under',
                        }
                      : { cursor: 'pointer' }
                  }
                >
                  {newSentence[0] === part
                    ? part.charAt(0).toUpperCase() + part.slice(1)
                    : part}
                </span>
              )
            })}
          </RestatementSplitter>
        ) : (
          <RestatementSplitter
            cursorFormat={point && !correct ? 'NONE' : 'POINTER'}
          >
            {sentence.split('').map((letter, i) => {
              const letterIndex = sentence
                .split('')
                .findIndex((letter) => letter[0])

              return (
                <span
                  key={i}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setPoint(i)
                    setAttempt((a) => a + 1)
                  }}
                >
                  {letterIndex === i ? letter.toUpperCase() : letter}
                </span>
              )
            })}
          </RestatementSplitter>
        )}
        {point ? (
          <RestatementFeedbackContainer correct={correct}>
            <UnderlinedText>Feedback</UnderlinedText>
            {!correct ? (
              <div>
                <div style={{ textAlign: 'center' }}>Not Quite</div>
                <br />
                <div>What went wrong? {whatWentWrong}</div>
                <br />
                <div>How to fix it: {howToFix}</div>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center' }}>{message}</div>
                <br />
                <div>
                  "{correctSubject}" is the complete subject of the sentence
                  because it is{' '}
                  {question.nounType === 'PERSON' ? 'who' : 'what'} the sentence
                  is about.
                </div>
                {question.helpingVerb === 'did' ? (
                  <div>
                    "
                    {newSentence[2].split('')[0].toString().toUpperCase() +
                      newSentence[2].slice(1, newSentence[2].length - 1)}
                    " is the complete predicate of the sentence because it is
                    what the {question.nounType.toLowerCase()} is doing.
                  </div>
                ) : auxilaryVerbCheck ? (
                  <div>
                    "
                    {newSentence[2].split('')[0].toString().toUpperCase() +
                      newSentence[2].slice(1, newSentence[2].length - 1)}
                    " is the complete predicate of the sentence because it is
                    what is being done to the {question.nounType.toLowerCase()}.
                  </div>
                ) : (
                  <div>
                    "
                    {newSentence[2].split('')[0].toString().toUpperCase() +
                      newSentence[2].slice(1, newSentence[2].length - 1)}
                    " is the complete predicate of the sentence because it is
                    what the {question.nounType.toLowerCase()} is.
                  </div>
                )}
                <br />
                {/* <button onClick={() => setSentence(newSentence.join(' '))}>Next Step</button> */}
              </div>
            )}
          </RestatementFeedbackContainer>
        ) : (
          <div></div>
        )}
      </>
    </>
  )
}
// {question.helpingVerb === 'did' ? (
//   <div>
//     "
//     {newSentence[2].split('')[0].toString().toUpperCase() +
//       newSentence[2].slice(1, newSentence[2].length - 1)}
//     " is the complete predicate of the sentence because it is what
//     the {question.nounType.toLowerCase()} is doing.
//   </div>
// ) : auxilaryVerbCheck ? (
//   <div>
//     "
//     {newSentence[2].split('')[0].toString().toUpperCase() +
//       newSentence[2].slice(1, newSentence[2].length - 1)}
//     " is the complete predicate of the sentence because it is what
//     is being done to the {question.nounType.toLowerCase()}.
//   </div>
// ) : (
//   <div>
//     "
//     {newSentence[2].split('')[0].toString().toUpperCase() +
//       newSentence[2].slice(1, newSentence[2].length - 1)}
//     " is the complete predicate of the sentence because it is what
//     the {question.nounType.toLowerCase()} is.
//   </div>
// )}
