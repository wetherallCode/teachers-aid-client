import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  gql,
} from '@apollo/client'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import {
  findReadingGuideById_findReadingGuideById_readingGuide,
  updateReadingGuide,
  updateReadingGuideVariables,
  me_me_Student,
  ReadingGuideMetricEnum,
} from '../../../../../../schemaTypes'

import { SubmitReadingGuide } from './SubmitReadingGuide'

import { ReadingGuideHeader } from '../state-and-styles/readingGuideStyles'

import { useState } from 'react'
import { GenericQuestionBlank } from './GenericQuestionBlank'
import {
  ReadingGuideQuestionState,
  readingGuideQuestions,
} from '../state-and-styles/RadingGuideQuestionState'

export type CompleteReadingGuideNewProps = {
  readingGuideInfo: findReadingGuideById_findReadingGuideById_readingGuide
}

export const UPDATE_READING_GUIDE_MUTATION_New = gql`
  mutation updateReadingGuideNew($input: UpdateReadingGuideInput!) {
    updateReadingGuide(input: $input) {
      readingGuide {
        _id
      }
    }
  }
`

export type updateReadingGuideNewType = (
  options?:
    | MutationFunctionOptions<
        updateReadingGuide,
        updateReadingGuideVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined,
) => void

export const CompleteReadingGuideNew = ({
  readingGuideInfo,
}: CompleteReadingGuideNewProps) => {
  const me: me_me_Student = useUserContextProvider()
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const questions = readingGuideInfo.readingGuideFinal?.readingGuideQuestions

  const basicState: ReadingGuideQuestionState[] = [
    'SUMMARY',
    'WHAT_WAS_LEARNED',
  ]

  const developingState: ReadingGuideQuestionState[] = [
    'SUBJECT_OF_SECTION',
    'PROBLEM',
    'SOLUTION',
  ]
  const academicState: ReadingGuideQuestionState[] = [
    'SUBJECT_OF_SECTION',
    'PROBLEM',
    'WHY_PROBLEM',
    'SOLUTION',
  ]
  const advancedState: ReadingGuideQuestionState[] = [
    'SUBJECT_OF_SECTION',
    'PROBLEM',
    'WHY_PROBLEM',
    'SOLUTION',
    'SOLUTIONS_REASON',
  ]
  const masterState: ReadingGuideQuestionState[] = [
    'SUBJECT_OF_SECTION',
    'PROBLEM',
    'WHY_PROBLEM',
    'SOLUTION',
    'SOLUTIONS_REASON',
    'ASSUMPTIONS',
  ]

  const readingGuideLevel =
    me.hasProgressTracker.readingGuideProgressTracker.readingGuideLevel

  const currentState =
    readingGuideLevel === ReadingGuideMetricEnum.BASIC
      ? basicState
      : readingGuideLevel === ReadingGuideMetricEnum.DEVELOPING
        ? developingState
        : readingGuideLevel === ReadingGuideMetricEnum.ACADEMIC
          ? academicState
          : readingGuideLevel === ReadingGuideMetricEnum.ADVANCED
            ? advancedState
            : masterState

  return (
    <>
      <ReadingGuideHeader>
        <div>Reading Guide</div>
      </ReadingGuideHeader>
      <>
        {currentState[currentIndex] === undefined && (
          <SubmitReadingGuide
            readingGuideInfo={readingGuideInfo}
            setCurrentIndex={setCurrentIndex}
            readingGuideLevel={currentState}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'SUMMARY' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'WHAT_WAS_LEARNED' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'MAIN_IDEA' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'SUBJECT_OF_SECTION' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'WHAT_DID_SUBJECT_DO' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'WHY_DID_SUBJECT_DO_IT' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'HOW_DID_SUBJECT_DO_IT' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'PROBLEM' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'WHY_PROBLEM' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'SOLUTION' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'SOLUTIONS_REASON' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
      <>
        {currentState[currentIndex] === 'ASSUMPTIONS' && (
          <GenericQuestionBlank
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            questionObject={
              readingGuideQuestions.find(
                (q) => q.questionType === currentState[currentIndex],
              )!
            }
            previousAnswers={questions}
          />
        )}
      </>
    </>
  )
}
