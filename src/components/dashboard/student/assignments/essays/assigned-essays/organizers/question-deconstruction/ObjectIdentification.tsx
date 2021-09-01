import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { useSelectedText } from '../../../../../../../../hooks/useSelectedText'
import {
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  WritingLevelEnum,
} from '../../../../../../../../schemaTypes'
import {
  capitalizer,
  irregularPastTenseVerbList,
  timeAFunction,
} from '../../../../../../../../utils'

import { LineToManipulate } from '../../../../../../teacher/development/grammar/question-deconstruction/VerbIdentification'
import {
  RestatementDirectionsContainer,
  RestatementDirectionsContainerObjectDirections,
  RestatementDirectionsContainerObjectDirectionsButton,
  RestatementDirectionsContainerObjectDirectionsButtonContainer,
  RestatementFeedbackContainer,
  RestatementFeedBackContainerMessageContainer,
  RestatementFeedbackContainerObjectIndentification,
  RestatementQuestionToRestateContainer,
  SentenceToManipulate,
} from '../../state-and-styles/assignedEssayStyles'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { objectGrader } from './ObjectGrader'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'

export type ObjectIdentificationProps = {
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
  questionToModify: string[]
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  object: string | null
  setObject: Dispatch<SetStateAction<string | null>>
  writingLevel: WritingLevelEnum
}

export const ObjectIdentification = ({
  setState,
  question,
  questionToModify,
  object,
  setObject,
  writingLevel,
}: ObjectIdentificationProps) => {
  const [, event] = useStudentEssayContextProvider()
  const [select, text, reset] = useSelectedText()
  const [step, setStep] = useState<'checkForObject' | 'identifyObject'>(
    'checkForObject'
  )
  const [attempts, setAttempts] = useState(0)
  const [enabled, setEnabled] = useState(true)
  const [correct, setCorrect] = useState(false)
  const [transitiveQuestionMessage, setTransitiveQuestionMessage] = useState<
    string | null
  >(null)

  const { correctObject, message, correctMessage, howToFix } = objectGrader({
    completePredicate: question.completePredicate,
    completeSubject: question.completeSubject,
    correctObject: question.object!,
    givenObject: text,
    simplePredicate: question.simplePredicate,
    questionToModify,
    simpleSubject: question.simpleSubject,
  })

  const hasObject = question.object

  const auxilaryVerbCheck =
    question.helpingVerb !== 'did' &&
    question.simplePredicate.split(' ').length > 1 &&
    question.simplePredicate.split(' ').includes(question.helpingVerb)

  const conjugatedVerb =
    irregularPastTenseVerbList(question.simplePredicate) ===
    question.simplePredicate
      ? question.simplePredicate + 'ed'
      : irregularPastTenseVerbList(question.simplePredicate)

  const indexOfVerb = questionToModify
    .join(' ')
    .split(' ')
    .findIndex((word) => word === conjugatedVerb)

  const sentenceAfterVerb = questionToModify
    .join(' ')
    .split(' ')
    .slice(indexOfVerb + 1)

  useEffect(() => {
    if (correctObject && text) {
      const timer = setTimeout(() => {
        if (writingLevel === WritingLevelEnum.DEVELOPING)
          event({
            type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_OBJECT',
            payload: text.replace('.', ''),
          })
        if (writingLevel === WritingLevelEnum.ACADEMIC)
          event({
            type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_OBJECT',
            payload: text.replace('.', ''),
          })
        if (writingLevel === WritingLevelEnum.ADVANCED)
          event({
            type: 'SET_ADVANCED_SENTENCE_STRUCTURE_OBJECT',
            payload: text.replace('.', ''),
          })
        setState('ending-phrase')
        return () => clearTimeout(timer)
      }, 4000)
    }
    if (text && !correctObject) {
      setEnabled(false)
      const startTime = new Date().toISOString()
      const timer = setTimeout(
        () => {
          const endTime = new Date().toISOString()
          const timeToComplete = timeAFunction(startTime, endTime)
          reset()
          setEnabled(true)
          console.log(timeToComplete)
        },
        attempts < 1 ? 4000 : 4000 + attempts * 1000
      )
      return () => clearTimeout(timer)
    }
  }, [correctObject, setState, text])

  return (
    <>
      {step === 'checkForObject' && (
        <>
          <RestatementDirectionsContainerObjectDirections>
            <UnderlinedText>Directions</UnderlinedText>
            <div>
              The next step is to figure out the direct object of the verb. Some
              verbs are transitive and have an object, and some verbs are
              intransitive and have no object. To find out if the verb "
              {auxilaryVerbCheck ? question.simplePredicate : conjugatedVerb}"
              has an object, read your sentence
            </div>
            <br />
            <div>{questionToModify.join(' ').replace(' | ', ' ')}</div>
            <br />
            <div>
              and ask yourself: Did {question.completeSubject}{' '}
              {question.simplePredicate} something? If there is a direct answer
              to this question, the answer is yes. If there isn't a direct
              answer (or the question makes no sense), the answer is no.
            </div>
          </RestatementDirectionsContainerObjectDirections>
          <RestatementDirectionsContainerObjectDirectionsButtonContainer>
            <RestatementDirectionsContainerObjectDirectionsButton
              onClick={() => {
                if (hasObject) {
                  setCorrect(true)
                  setTransitiveQuestionMessage(
                    'Correct! This verb is transitive in this case and takes an object, and we are going to find it!'
                  )
                  const timer = setTimeout(() => {
                    setStep('identifyObject')
                  }, 4000)
                  return () => clearTimeout(timer)
                } else {
                  if (
                    question.helpingVerb === 'was' ||
                    (question.helpingVerb === 'were' && !auxilaryVerbCheck)
                  ) {
                    setTransitiveQuestionMessage(
                      `Since the helping verb is ${question.helpingVerb} there is no object. ${question.helpingVerb} is a linking verb, and linking verbs and they don't take objects. `
                    )
                  } else {
                    setTransitiveQuestionMessage(
                      `Since the helping verb is ${question.helpingVerb} there is no object. ${question.helpingVerb} is an auxilary verb with an action verb that it is helping, and linking verbs and they never take objects. `
                    )
                  }
                  setTransitiveQuestionMessage(
                    question.helpingVerb === 'did'
                      ? `Not this time. The verb doesn't take an object.`
                      : auxilaryVerbCheck
                      ? `Auxillary verbs and the main verb like "${question.simplePredicate}" never take objects.`
                      : null
                  )
                  const timer = setTimeout(() => {
                    setTransitiveQuestionMessage(null)
                    setState('ending-phrase')
                  }, 5000)
                  return () => clearTimeout(timer)
                }
              }}
            >
              Yes there IS an object
            </RestatementDirectionsContainerObjectDirectionsButton>
            <RestatementDirectionsContainerObjectDirectionsButton
              onClick={() => {
                if (hasObject) {
                  setTransitiveQuestionMessage(
                    'Incorrect, the verb has an object. Now we are going to find it!'
                  )
                  const timer = setTimeout(() => {
                    setStep('identifyObject')
                  }, 3000)
                  return () => clearTimeout(timer)
                } else {
                  setCorrect(true)
                  if (question.helpingVerb !== 'did') {
                    if (!auxilaryVerbCheck) {
                      setTransitiveQuestionMessage(
                        `${capitalizer(
                          question.helpingVerb
                        )} is a linking verb and never takes an object.`
                      )
                    } else {
                      setTransitiveQuestionMessage(
                        `${capitalizer(
                          question.helpingVerb
                        )} is an auxilary verb and never takes an object.`
                      )
                    }
                  }
                  setTransitiveQuestionMessage(
                    'You are correct! This verb is intransitive and has no object.'
                  )
                  const timer = setTimeout(() => {
                    // setStep('identifyObject')
                    setState('ending-phrase')
                  }, 3000)
                  return () => clearTimeout(timer)
                }
              }}
            >
              No there is NOT an object
            </RestatementDirectionsContainerObjectDirectionsButton>
          </RestatementDirectionsContainerObjectDirectionsButtonContainer>
          <br />
          {transitiveQuestionMessage && (
            <RestatementFeedbackContainerObjectIndentification
              correct={correct}
            >
              <UnderlinedText>Feedback</UnderlinedText>
              {transitiveQuestionMessage}
            </RestatementFeedbackContainerObjectIndentification>
          )}
        </>
      )}

      {step === 'identifyObject' && (
        <>
          <RestatementDirectionsContainer>
            <UnderlinedText>Directions</UnderlinedText>
            <div>
              Now we must find the object. Select the word or words that you
              think are the object. Remember: the object comes directly after
              the verb and is a noun or an adjective that describes the noun and
              the noun together.
            </div>
          </RestatementDirectionsContainer>
          <RestatementQuestionToRestateContainer>
            <SentenceToManipulate
              cursorFormat={enabled ? 'TEXT' : 'NONE'}
              onMouseUp={(e) => {
                enabled ? select() : e.preventDefault()
                enabled && setAttempts((a) => a + 0.5)
              }}
              onSelect={(e) => !enabled && e.preventDefault()}
            >
              {questionToModify.map((word, i: number) => (
                <span key={i}>
                  <span>{word}</span>
                  {word !== questionToModify[questionToModify.length - 1] && (
                    <span> </span>
                  )}
                </span>
              ))}
            </SentenceToManipulate>
          </RestatementQuestionToRestateContainer>
          {text && (
            <RestatementFeedbackContainer correct={correctObject}>
              <UnderlinedText>Feedback</UnderlinedText>
              {!correctObject ? (
                <RestatementFeedBackContainerMessageContainer>
                  <div>What went wrong? {message}</div>
                  <br />
                  <div>How do I fix it? {howToFix}</div>
                </RestatementFeedBackContainerMessageContainer>
              ) : (
                <RestatementFeedBackContainerMessageContainer>
                  {correctMessage}
                </RestatementFeedBackContainerMessageContainer>
              )}
            </RestatementFeedbackContainer>
          )}
        </>
      )}
    </>
  )
}
