import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { capitalizer } from '../../../../../../utils'
import { subjectPredicateGrader } from '../complete-subject-predicate/subjectPredicateGrading'
import {
  SubjectPredicateContainer,
  DirectionsContainer,
  SentenceContainer,
  MessageContainer,
} from '../complete-subject-predicate/subjectPredicateStyles'
import {
  QuestionProps,
  QuestionDeconstructProps,
} from './QuestionDeconstruction'

export type SubjectPredicateSplitProps = {
  questionToModify: string[]
  question: QuestionProps
  setQuestionToModify: Dispatch<SetStateAction<string[]>>
  setState: Dispatch<SetStateAction<QuestionDeconstructProps>>
}

export const SubjectPredicateSplit = ({
  questionToModify,
  setQuestionToModify,
  setState,
  question,
}: SubjectPredicateSplitProps) => {
  const [point, setPoint] = useState<number | null>(null)

  const separator = ' | '

  let sentence = [
    ...questionToModify.slice(0, questionToModify.length - 2),
    questionToModify[questionToModify.length - 2] + '?',
  ].join(' ')

  const newSentence = [
    sentence.slice(0, point!).trim(),
    separator,
    sentence.slice(point!, sentence.length).trim(),
  ]

  const { message, correct, whatWentWrong, howToFix } = subjectPredicateGrader({
    correctSubject: question.completeSubject,
    givenSubject: newSentence[0],
    givenPredicate: newSentence[2],
    sentence,
    noun: question.simpleSubject.split(' '),
    compoundNoun: question.compoundNoun,
    nounType: question.nounType,
    verb: question.simplePredicate,
    verbType: 'action',
  })

  useEffect(() => {
    if (point && correct) {
      setTimeout(() => {
        setQuestionToModify(newSentence.join(' ').split(' '))
        setState('helping-verb-id')
      }, 2000)
    } else
      setTimeout(() => {
        setPoint(null)
      }, 10000)
  }, [point])

  return (
    <SubjectPredicateContainer>
      <DirectionsContainer>
        <div>
          Click on the sentence below to separate it into the subject and
          predicate.
        </div>
        <div>
          The subject will be on the right with a single underline, and the
          predicate will be on the left with double underline.
        </div>
      </DirectionsContainer>
      {point ? (
        <SentenceContainer>
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
                onClick={() => {
                  if (part === separator) {
                    setPoint(null)
                  }
                }}
              >
                {newSentence[0] === part
                  ? part.charAt(0).toUpperCase() + part.slice(1)
                  : part}
                {/* {part} */}
              </span>
            )
          })}
        </SentenceContainer>
      ) : (
        <SentenceContainer>
          {sentence.split('').map((letter, i) => {
            const letterIndex = sentence
              .split('')
              .findIndex((letter) => letter[0])

            return (
              <span
                key={i}
                style={{ cursor: 'pointer' }}
                onClick={() => setPoint(i)}
              >
                {letterIndex === i ? letter.toUpperCase() : letter}
              </span>
            )
          })}
        </SentenceContainer>
      )}
      {point ? (
        <MessageContainer correct={correct}>
          {!correct ? (
            <div>
              <div style={{ textAlign: 'center' }}>Not Quite</div>
              <br></br>
              <div>What went wrong? {whatWentWrong}</div>
              <div>How to fix it: {howToFix}</div>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center' }}>{message}</div>
              <br />
              <div>
                "
                {newSentence[0].charAt(0).toUpperCase() +
                  newSentence[0].slice(1)}
                " is the complete subject of the sentence because it is{' '}
                {question.nounType === 'PERSON' ? 'who' : 'what'} the sentence
                is about.
              </div>
              <div>
                "
                {newSentence[2].split('')[0].toString().toUpperCase() +
                  newSentence[2].slice(1, newSentence[2].length - 1)}
                " is the complete predicate of the sentence because it is what
                the {question.nounType === 'PERSON' ? 'PERSON' : 'THING'} is
                doing.
              </div>
              <br />
              {/* <button onClick={() => setSentence(newSentence.join(' '))}>Next Step</button> */}
            </div>
          )}
        </MessageContainer>
      ) : (
        <div></div>
      )}
    </SubjectPredicateContainer>
  )
}
