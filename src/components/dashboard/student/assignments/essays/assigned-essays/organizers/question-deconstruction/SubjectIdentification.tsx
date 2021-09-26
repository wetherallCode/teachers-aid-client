import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { useSelectedText } from '../../../../../../../../hooks/useSelectedText'
import {
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  WritingLevelEnum,
} from '../../../../../../../../schemaTypes'
import { timeAFunction } from '../../../../../../../../utils'
import {
  RestatementDirectionsContainer,
  RestatementFeedbackContainer,
  RestatementFeedBackContainerMessageContainer,
  RestatementQuestionToRestateContainer,
  SentenceToManipulate,
} from '../../state-and-styles/assignedEssayStyles'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'
import { simpleSubjectGrader } from './simpleSubjectGrader'

export type SubjectIdentificationProps = {
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
  questionToModify: string[]
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  subject: string | null
  setSubject: Dispatch<SetStateAction<string | null>>
  writingLevel: WritingLevelEnum
}

export const SubjectIdentification = ({
  setState,
  question,
  questionToModify,
  subject,
  setSubject,
  writingLevel,
}: SubjectIdentificationProps) => {
  const [, event] = useStudentEssayContextProvider()
  const [select, text, reset] = useSelectedText()
  const [enabled, setEnabled] = useState(true)

  const [attempts, setattempts] = useState(0)

  const { correctSimpleSubject, howToFix, message, whatWentWrong } =
    simpleSubjectGrader({
      correctSimpleSubject: question.simpleSubject,
      givenSimpleSubject: text.trim(),
      completeSubject: question.completeSubject,
      compoundNoun: question.compoundNoun,
      questionToModify,
      nounType: question.nounType,
    })

  // const subjectLowerCaseCheck = (word: string)=>{
  //   if (word )
  // }

  useEffect(() => {
    if (correctSimpleSubject && text) {
      setSubject(text)
      if (writingLevel === WritingLevelEnum.DEVELOPING) {
        event({
          type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT',
          payload: text,
        })
      }
      if (writingLevel === WritingLevelEnum.ACADEMIC)
        event({
          type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT',
          payload: text,
        })
      if (writingLevel === WritingLevelEnum.ADVANCED)
        event({
          type: 'SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT',
          payload: text,
        })
      const timer = setTimeout(() => {
        setState('verb-identification')
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
    if (text && !correctSimpleSubject) {
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
        attempts === 0 ? 3000 : 3000 + 1000 * attempts
      )
      return () => {
        clearTimeout(timer)
      }
    }
  }, [correctSimpleSubject, text])

  return (
    <>
      <RestatementDirectionsContainer>
        <UnderlinedText>Identify the Simple Subject</UnderlinedText>
        Select and highlight the Simple Subject of the question. Simple subjects
        are the noun in the complete subject. There may be adjectives that
        modify the noun or prepositional phrases that add specificity to the
        noun, but only select the person, place, thing, or idea.
      </RestatementDirectionsContainer>
      <RestatementQuestionToRestateContainer>
        <SentenceToManipulate
          cursorFormat={enabled ? 'TEXT' : 'NONE'}
          onMouseUp={(e) => {
            enabled ? select() : e.preventDefault()
            enabled && setattempts((a) => a + 0.5)
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
      <>
        {text && (
          <RestatementFeedbackContainer correct={correctSimpleSubject}>
            <UnderlinedText>Feedback</UnderlinedText>
            {correctSimpleSubject ? (
              <RestatementFeedBackContainerMessageContainer>
                {message}
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
    </>
  )
}
