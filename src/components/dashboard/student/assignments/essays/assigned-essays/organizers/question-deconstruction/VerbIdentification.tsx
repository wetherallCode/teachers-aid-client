import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { useSelectedText } from '../../../../../../../../hooks/useSelectedText'
import {
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  WritingLevelEnum,
} from '../../../../../../../../schemaTypes'
import {
  irregularPastTenseVerbList,
  specialVerbsInPastTense,
  timeAFunction,
} from '../../../../../../../../utils'
import {
  RestatementDirectionsContainer,
  RestatementFeedbackContainer,
  RestatementFeedBackContainerMessageContainer,
  RestatementQuestionToRestateContainer,
  SentenceToManipulate,
} from '../../state-and-styles/assignedEssayStyles'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'
import { simplePredicateGrader } from './simplePredicateGrader'

export type VerbIdentificationProps = {
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
  questionToModify: string[]
  setQuestionToModify: Dispatch<SetStateAction<string[]>>
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  verb: string | null
  setVerb: Dispatch<SetStateAction<string | null>>
  writingLevel: WritingLevelEnum
}

export const VerbIdentification = ({
  questionToModify,
  setQuestionToModify,
  setState,
  question,
  verb,
  setVerb,
  writingLevel,
}: VerbIdentificationProps) => {
  const [, event] = useStudentEssayContextProvider()
  const [select, text, reset] = useSelectedText()
  const [attempts, setAttempts] = useState(0)
  const [enabled, setEnabled] = useState(true)

  const auxilaryVerbCheck =
    (question.helpingVerb !== 'did' &&
      question.simplePredicate.split(' ').length > 1 &&
      question.simplePredicate.split(' ').includes(question.helpingVerb)) ||
    (question.helpingVerb !== 'did' && !question.subjectCompliment)

  const { correctSimplePredicate, howToFix, message, whatWentWrong } =
    simplePredicateGrader({
      completePredicate:
        question.helpingVerb !== 'did' &&
        !auxilaryVerbCheck &&
        question.completePredicate
          ? question.helpingVerb + ' ' + question.completePredicate
          : question.completePredicate,
      correctSimplePredicate: auxilaryVerbCheck
        ? question.helpingVerb + ' ' + question.simplePredicate
        : question.simplePredicate,
      givenSimplePredicate: text.trim(),
      verbType: question.verbType,
      helpingVerb: question.helpingVerb,
      questionToModify,
      auxilaryVerbCheck,
    })

  const irregularVerbCheck = irregularPastTenseVerbList(text)

  const conjugatedVerb = (verb: string) => {
    return verb !== specialVerbsInPastTense(verb)
      ? specialVerbsInPastTense(verb)
      : verb === irregularVerbCheck
      ? irregularVerbCheck
          .charAt(irregularVerbCheck.length - 1)
          .toLowerCase() === 'e'
        ? verb + 'd'
        : verb + 'ed'
      : irregularVerbCheck
  }

  useEffect(() => {
    if (correctSimplePredicate && text) {
      setEnabled(false)
      setVerb(text)
      // const pastTenseVerb =
      //   irregularPastTenseVerbList(text) === text
      //     ? text + 'ed'
      //     : irregularPastTenseVerbList(text)
      const pastTenseVerb = conjugatedVerb(text)

      setTimeout(() => {
        question.helpingVerb === 'did' &&
          setQuestionToModify(
            questionToModify
              .join(' ')
              .replace(
                question.simplePredicate,
                conjugatedVerb(question.simplePredicate)
                // irregularPastTenseVerbList(question.simplePredicate) ===
                //   question.simplePredicate
                //   ? question.simplePredicate + 'ed'
                //   : irregularPastTenseVerbList(question.simplePredicate)
              )
              .split(' ')
          )

        if (writingLevel === WritingLevelEnum.DEVELOPING) {
          event({
            type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_VERB',
            payload:
              question.helpingVerb === 'did'
                ? pastTenseVerb
                : auxilaryVerbCheck
                ? question.helpingVerb + ' ' + question.simplePredicate
                : question.simplePredicate,
          })
          if (question.helpingVerb === 'did' || auxilaryVerbCheck)
            setState('object-identification')
          if (question.helpingVerb !== 'did' && !auxilaryVerbCheck) {
            setState('subject-complement-identification')
          }
          // setState('ending-phrase')
        }

        if (writingLevel === WritingLevelEnum.ACADEMIC) {
          event({
            type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_VERB',
            payload:
              question.helpingVerb === 'did'
                ? conjugatedVerb(question.simplePredicate)
                : question.simplePredicate,
          })
          console.log(question.helpingVerb === 'did' || auxilaryVerbCheck)
          if (question.helpingVerb === 'did' || auxilaryVerbCheck)
            setState('object-identification')
          if (question.helpingVerb !== 'did' && !auxilaryVerbCheck) {
            setState('subject-complement-identification')
          }

          if (
            question.helpingVerb !== 'did' &&
            auxilaryVerbCheck &&
            question.object !== null
          ) {
            setState('object-identification')
          }
          if (
            question.helpingVerb !== 'did' &&
            auxilaryVerbCheck &&
            question.object === null
          ) {
            setState('ending-phrase')
          }
        }

        if (writingLevel === WritingLevelEnum.ADVANCED) {
          event({
            type: 'SET_ADVANCED_SENTENCE_STRUCTURE_VERB',
            payload: pastTenseVerb,
          })
          if (question.helpingVerb === 'did' || auxilaryVerbCheck)
            setState('object-identification')
          if (question.helpingVerb !== 'did' && !auxilaryVerbCheck) {
            setState('subject-complement-identification')
          }
        }
      }, 3000)
    }

    if (text && !correctSimplePredicate) {
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
        attempts < 1 ? 7000 : 7000 + attempts * 1000
        // 3000
      )
      return () => clearTimeout(timer)
    }
  }, [correctSimplePredicate, text])

  return (
    <>
      <RestatementDirectionsContainer>
        <UnderlinedText>Identify the Verb</UnderlinedText>
        {question.helpingVerb === 'did' ? (
          <div>
            Find the Verb or Verb Phrase. Select the word or group of words that
            are the action, being, having, or feeling word that is in the
            complete predicate (the right side of the divider). Most of the time
            it is one word, but often times can be two words. Verbs like take
            off, get away, let go are verb phrases so you would need to select
            both words. This can be tricky at first but it will get easier with
            practice.
          </div>
        ) : (
          <div>
            Find the Verb or Verb Phrase. Since the helping verb is "
            {question.helpingVerb}" then "{question.helpingVerb}" is either a
            auxilary verb that comes before a main verb, or{' '}
            {question.helpingVerb} is the verb which makes it a linking verb. If
            there is an action word after "{question.helpingVerb}", highlight
            both "{question.helpingVerb}" and the action word. If there isn't an
            action word after "{question.helpingVerb}," just double click "
            {question.helpingVerb}."
            {/* The way to figure it out is to look at the
            word that comes after {question.helpingVerb}. Is there an action
            word that comes after it or a person, place, thing, or idea that
            comes after. */}
          </div>
        )}
      </RestatementDirectionsContainer>

      {enabled ? (
        <RestatementQuestionToRestateContainer>
          <SentenceToManipulate
            cursorFormat={enabled ? 'TEXT' : 'NONE'}
            onMouseUp={(e) => {
              enabled ? select() : e.preventDefault()
              enabled && setAttempts((a) => a + 0.5)
            }}
            onSelect={(e) => !enabled && e.preventDefault()}
          >
            {questionToModify
              .join(' ')
              .split(' ')
              .map((part, i: number) => (
                <span key={i}>
                  <span>{part}</span>
                  {part !== questionToModify[questionToModify.length - 1] && (
                    <span> </span>
                  )}
                </span>
              ))}
          </SentenceToManipulate>
        </RestatementQuestionToRestateContainer>
      ) : (
        <>
          {text && (
            <RestatementFeedbackContainer correct={correctSimplePredicate}>
              <UnderlinedText>Feedback</UnderlinedText>
              {correctSimplePredicate ? (
                <RestatementFeedBackContainerMessageContainer>
                  <div>{message} </div>
                  <br />
                  <div>
                    Because the verb is {question.simplePredicate}{' '}
                    {question.helpingVerb !== 'did'
                      ? `it is already past tense and doesn't change.`
                      : irregularPastTenseVerbList(text) === text
                      ? `it gets changed to its past tense form: ${conjugatedVerb(
                          text
                        )}`
                      : `it is an irregular verb and gets changed to ${irregularPastTenseVerbList(
                          text
                        )}`}
                  </div>
                </RestatementFeedBackContainerMessageContainer>
              ) : (
                <RestatementFeedBackContainerMessageContainer>
                  <div>
                    What went wrong? <span>{whatWentWrong}</span>
                  </div>
                  <br />
                  <div>
                    How do you fix it? <span>{howToFix}</span>
                  </div>
                </RestatementFeedBackContainerMessageContainer>
              )}
            </RestatementFeedbackContainer>
          )}
        </>
      )}
    </>
  )
}
