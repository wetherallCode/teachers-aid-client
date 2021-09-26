import { useMutation } from '@apollo/client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { useUserContextProvider } from '../../../../../../../../contexts/UserContext'
import {
  BasicQuestionEnum,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  me_me_Student,
  setAnswerTypeVariables,
  setAnswerType,
  WritingLevelEnum,
  QuestionTypeEnum,
  QuestionWordEnum,
} from '../../../../../../../../schemaTypes'
import {
  EndingPhraseOptionsContainer,
  FinalRestatementMessage,
  FinalRestatementMessageContainer,
  FinalRestatementStyles,
  RestatementDirectionsContainer,
  RestatementFeedbackContainer,
  RestatementQuestionToRestateContainer,
  RestatementQuestionToRestateSelection,
} from '../../state-and-styles/assignedEssayStyles'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { SET_ANSWER_TYPE_MUTATION } from '../academic/AcademicAnswerTypes'
import { endingPhraseGrader } from './EndingPhraseGrader'
import { QuestionDecontstructionStateProps } from './QuestionDeconstruction'

export type EndingPhraseProps = {
  setState: Dispatch<SetStateAction<QuestionDecontstructionStateProps>>
  questionToModify: string[]
  question: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  writingLevel: WritingLevelEnum
}

export type EndingPhraseAnswerTypes =
  | 'how'
  | 'why'
  | 'toSolveAProblem'
  | 'inACertainWay'
  | 'forACertainReason'
  | ''

export const EndingPhrase = ({
  setState,
  question,
  questionToModify,
  writingLevel,
}: EndingPhraseProps) => {
  const [state, event] = useStudentEssayContextProvider()
  const [answer, setAnswer] = useState<EndingPhraseAnswerTypes>('')
  const [questionTypeCorrect, setQuestionTypeCorrect] = useState(false)
  const [questionTypeEnabled, setQuestionTypeEnabled] = useState(true)
  const [questionTypeMessage, setQuestionTypeMessage] = useState<null | string>(
    null
  )
  const [enabled, setEnabled] = useState(true)

  const [setAnswerType] = useMutation<setAnswerType, setAnswerTypeVariables>(
    SET_ANSWER_TYPE_MUTATION,
    {
      variables: {
        input: {
          essayId: state.context.essayId,
          questionType: state.context.academicOrganizer.questionType!,
        },
      },
      onCompleted: (data) => console.log(data),
      refetchQueries: [''],
    }
  )

  const sentenceJoiner = (sentence: string[]) => {
    if (sentence.includes('|')) {
      const seperator = sentence.findIndex((i) => i === '|')
      return [
        ...sentence.slice(0, seperator - 1),
        ...sentence.slice(seperator + 2),
      ]
    } else {
      return []
    }
  }
  const sentence = sentenceJoiner(questionToModify)

  const { correct, ending, message, waitTime } = endingPhraseGrader({
    correctQuestionWord: question.questionWord.toLowerCase(),
    givenQuestionWord: answer,
    writingLevel,
    correctQuestionType: question.questionType,
  })

  useEffect(() => {
    if (state.context.academicOrganizer.questionType !== null) {
      const timer = setTimeout(() => {
        setAnswerType()
        // console.log('setting answer type')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.context.academicOrganizer.questionType])

  useEffect(() => {
    if (answer) {
      if (correct) {
        if (writingLevel === WritingLevelEnum.DEVELOPING) {
          console.log(answer && answer === 'how')
          event({
            type: 'SET_BASIC_QUESTION_TYPE',
            payload:
              answer && answer === 'how'
                ? BasicQuestionEnum.HOW
                : BasicQuestionEnum.WHY,
          })
        }
        if (writingLevel === WritingLevelEnum.ACADEMIC) {
        }
        const timer = setTimeout(() => {
          event({
            type: 'SET_RESTATEMENT',
            payload: sentence.join(' ').replace('.', ' ') + ending,
          })
          event({ type: 'NEXT' })
          return () => clearTimeout(timer)
        }, waitTime * 2000)
      } else {
        const timer = setTimeout(() => {
          setAnswer('')
        }, waitTime * 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [answer])

  const questionTypeChecker =
    writingLevel === WritingLevelEnum.ACADEMIC &&
    state.context.academicOrganizer.questionType !== null

  const handleQuestionTypeSelector = (
    questionType: QuestionTypeEnum,
    questionWord: QuestionWordEnum
  ) => {
    if (question.questionType === questionType) {
      setQuestionTypeMessage('Correct!')
      setQuestionTypeCorrect(true)
      const timer = setTimeout(() => {
        event({
          type: 'SET_FULL_QUESTION_TYPE',
          payload: questionType,
        })
        setQuestionTypeMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      const shouldBeHowProblemSolution =
        questionType === QuestionTypeEnum.HOW_CAUSE_EFFECT &&
        question.questionType === QuestionTypeEnum.HOW_PROBLEM_SOLUTION

      const shouoldBeHowCauseAndEffect =
        questionType === QuestionTypeEnum.HOW_PROBLEM_SOLUTION &&
        question.questionType === QuestionTypeEnum.HOW_CAUSE_EFFECT

      const shouldBeWhyQuestion =
        question.questionWord === QuestionWordEnum.WHY &&
        questionWord === QuestionWordEnum.HOW
      const shouldBeHowQuestion =
        question.questionWord === QuestionWordEnum.HOW &&
        questionWord === QuestionWordEnum.WHY

      if (shouldBeHowProblemSolution || shouoldBeHowCauseAndEffect)
        setQuestionTypeMessage(
          'Nope: If the verb is affect, change, evolve, influence, or shape, it is a How: Cause and Effect Question. Otherwise, the sentence is a Problem and Solution question. '
        )

      if (shouldBeWhyQuestion || shouldBeHowQuestion)
        setQuestionTypeMessage(
          // 'Nope: If the verb is affect, affect, change, evolve, influence, or shape, it is a How: Cause and Effect Question. If the verb
          'Try again! Look at the question word again.'
        )
      setQuestionTypeCorrect(false)
      setQuestionTypeEnabled(false)

      const timer = setTimeout(() => {
        setQuestionTypeMessage(null)
        setQuestionTypeEnabled(true)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }

  return (
    <>
      <RestatementDirectionsContainer>
        <UnderlinedText>Ending Phrase</UnderlinedText>
        {writingLevel === WritingLevelEnum.DEVELOPING && (
          <div>
            Now we'll figure out how to end the sentence. There are different
            endings for different kinds of questions that give the reader a
            better understanding of how the question will be answered. Things
            will change as you progress, but for now all you need to do is end
            the question with "...for a certain reason" if it is a why question
            or "...in a certain way" if it is a how question.
          </div>
        )}
        {writingLevel === WritingLevelEnum.ACADEMIC && (
          <>
            {!questionTypeChecker ? (
              <div>
                Now that you've advanced, the ending of the restatement is going
                to change a little: First we need to figure out what kind of
                question is being asked. There are three types of questions: How
                questions can be Cause and Effect or Problem and Solution
                questions. Luckily, Why questions are always Cause and Effect
                questions. Choose which one you think fits for your statement.
                If the question is a how question, figure out if it is a Problem
                and Solution question or a Cause and Effect question, and Why
                questions take care of themselves.
              </div>
            ) : (
              <div>
                If the question is a problem and solution question then you
                would end the sentence "...to solve a problem." If the verb is
                solve or a synonym for solve you don't want to be repetitive so
                you can use "...in a certain way." If it is a why question, you
                will still end the sentence with "...for a certain reason."
              </div>
            )}
          </>
        )}
        <br />
        <div>For the question: {question.originalQuestion}</div>
        <br />
        <div>Click on the appropriate ending:</div>
      </RestatementDirectionsContainer>
      {writingLevel === WritingLevelEnum.DEVELOPING && (
        <EndingPhraseOptionsContainer>
          <RestatementQuestionToRestateSelection
            onClick={() => {
              setAnswer('how')
            }}
          >
            ...in a certain way.
          </RestatementQuestionToRestateSelection>
          <RestatementQuestionToRestateSelection
            onClick={() => {
              setAnswer('why')
            }}
          >
            ...for a certain reason.
          </RestatementQuestionToRestateSelection>
        </EndingPhraseOptionsContainer>
      )}
      {writingLevel === WritingLevelEnum.ACADEMIC && (
        <>
          {state.context.academicOrganizer.questionType === null ? (
            <EndingPhraseOptionsContainer>
              <RestatementQuestionToRestateSelection
                onClick={() => {
                  questionTypeEnabled &&
                    handleQuestionTypeSelector(
                      QuestionTypeEnum.HOW_PROBLEM_SOLUTION,
                      QuestionWordEnum.HOW
                    )
                }}
              >
                How: Problem and Solution
              </RestatementQuestionToRestateSelection>
              <RestatementQuestionToRestateSelection
                onClick={() => {
                  questionTypeEnabled &&
                    handleQuestionTypeSelector(
                      QuestionTypeEnum.HOW_CAUSE_EFFECT,
                      QuestionWordEnum.HOW
                    )
                }}
              >
                How: Cause and Effect
              </RestatementQuestionToRestateSelection>
              <RestatementQuestionToRestateSelection
                onClick={() => {
                  questionTypeEnabled &&
                    handleQuestionTypeSelector(
                      QuestionTypeEnum.WHY_CAUSE_EFFECT,
                      QuestionWordEnum.WHY
                    )
                }}
              >
                Why: Cause and Effect
              </RestatementQuestionToRestateSelection>
            </EndingPhraseOptionsContainer>
          ) : (
            <EndingPhraseOptionsContainer>
              <div onClick={() => setAnswer('toSolveAProblem')}>
                ...to solve a problem.
              </div>
              <div onClick={() => setAnswer('inACertainWay')}>
                ...in a certain way.
              </div>
              <div onClick={() => setAnswer('forACertainReason')}>
                ...for a certain reason.
              </div>
            </EndingPhraseOptionsContainer>
          )}
        </>
      )}
      <br />

      {answer && (
        <RestatementFeedbackContainer correct={correct}>
          <UnderlinedText>Feedback</UnderlinedText>
          {correct ? (
            <FinalRestatementMessageContainer>
              <FinalRestatementMessage>
                {message} Here's the final sentence:
              </FinalRestatementMessage>

              <FinalRestatementStyles>
                {questionToModify.join(' ').replace('|', '').replace('.', ' ') +
                  ending}
              </FinalRestatementStyles>
            </FinalRestatementMessageContainer>
          ) : (
            <>
              <div>{message}</div>
            </>
          )}
        </RestatementFeedbackContainer>
      )}
      {questionTypeMessage && (
        <RestatementFeedbackContainer correct={questionTypeCorrect}>
          <UnderlinedText>Feedback</UnderlinedText>
          {questionTypeCorrect ? (
            <FinalRestatementMessageContainer>
              <FinalRestatementMessage>
                {questionTypeMessage}
              </FinalRestatementMessage>
            </FinalRestatementMessageContainer>
          ) : (
            <>
              <div>{questionTypeMessage}</div>
            </>
          )}
        </RestatementFeedbackContainer>
      )}
    </>
  )
}
