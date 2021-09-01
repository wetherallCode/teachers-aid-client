import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { useSelectedText } from '../../../../../../../../hooks/useSelectedText'
import {
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  NounTypeEnum,
  WritingLevelEnum,
} from '../../../../../../../../schemaTypes'
import { phraseCapitalizer, timeAFunction } from '../../../../../../../../utils'
import {
  RestatementDirectionsContainer,
  RestatementDirectionsContainerObjectDirections,
  RestatementFeedbackContainer,
  RestatementFeedBackContainerMessageContainer,
  RestatementQuestionToRestateContainer,
  SentenceToManipulate,
} from '../../state-and-styles/assignedEssayStyles'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { objectGrader } from './ObjectGrader'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'
import { subjectComplimentGrader } from './subjectComplimentGrader'

export type SubjectComplimentIdentifierProps = {
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
  questionToModify: string[]
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  object: string | null
  setObject: Dispatch<SetStateAction<string | null>>
  writingLevel: WritingLevelEnum
}

export const SubjectComplimentIdentifier = ({
  setState,
  question,
  questionToModify,
  object,
  setObject,
  writingLevel,
}: SubjectComplimentIdentifierProps) => {
  const [, event] = useStudentEssayContextProvider()
  const [select, text, reset] = useSelectedText()
  const [attempts, setAttempts] = useState(0)
  const [enabled, setEnabled] = useState(true)

  const { correctSubjectCompliment, message, correctMessage, howToFix } =
    subjectComplimentGrader({
      completePredicate: question.completePredicate,
      completeSubject: question.completeSubject,
      givenSubjectCompliment: text,
      correctSubjectCompliment: question.subjectCompliment!,
      simplePredicate: question.simplePredicate,
      questionToModify,
      simpleSubject: question.simpleSubject,
    })
  useEffect(() => {
    if (correctSubjectCompliment && text) {
      const timer = setTimeout(() => {
        event({
          type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT',
          payload: text,
        })
        event({
          type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT',
          payload: text,
        })
        event({
          type: 'SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT',
          payload: text,
        })
        setState('ending-phrase')
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
    if (!correctSubjectCompliment && text) {
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
        // 4000
      )
      return () => clearTimeout(timer)
    }
  }, [text, correctSubjectCompliment])

  return (
    <>
      <RestatementDirectionsContainer>
        <UnderlinedText>Directions</UnderlinedText>
        <div>
          Since the verb "{question.helpingVerb}" a linking verb, there is no
          object. However, there is a noun that comes after "
          {question.helpingVerb}" called the subject compliment. Select the{' '}
          {question.nounType.toLowerCase()} that comes after the word "
          {question.helpingVerb}." This will include any adjective that modifies
          the {question.nounType.toLowerCase()}.
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
        <RestatementFeedbackContainer correct={correctSubjectCompliment}>
          <UnderlinedText>Feedback</UnderlinedText>
          {correctSubjectCompliment ? (
            <RestatementFeedBackContainerMessageContainer>
              {correctMessage}
            </RestatementFeedBackContainerMessageContainer>
          ) : (
            <RestatementFeedBackContainerMessageContainer>
              <div>
                What went wrong? <span>{message}</span>
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
  )
}
