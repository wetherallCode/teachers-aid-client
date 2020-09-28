import React, { FC, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  updateReadingGuideVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateReadingGuide,
  findReadingGuideById_findReadingGuideById_readingGuide,
  InformationStructureEnum,
} from '../../../../../schemaTypes'
import { useReadingGuideToCompleteContextProvider } from './state-and-styles/ReadingGuideToCompleteContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { informationStructure } from '../../../../../utils'
import { SubmitReadingGuide } from './SubmitReadingGuide'
import {
  SectionOrganizationContainer,
  ReadingGuideHeader,
  MajorSolutionContainer,
  ReasonForOrganizationContainer,
  MajorIssueContainer,
  MajorIssueSolvedContainer,
  ClarifyingQuestionsContainer,
  SubmitReadingGuideContainer,
  SectionOrganizationBodyContainer,
  ReadingGuideInput,
  ReadingGuideTextArea,
  ReadingGuideSelect,
  ClarifyingQuestionsForm,
  ClarifyingQuestionsTextArea,
  ClarifyingQuestionsAddButton,
  ClarifyingQuestionsSubmittedQuestionsDisplay,
  ClarifyingQuestionsSubmittedQuestionTitle,
  SubmitReadingGuideButton,
  ClarifyingQuestionsTitle,
  ClarifyingQuestionsSubmittedQuestion,
  ClarifyingQuestionsBlock,
} from './state-and-styles/readingGuideStyles'

export type CompleteReadingGuideProps = {
  readingGuideInfo: findReadingGuideById_findReadingGuideById_readingGuide
}

export const UPDATE_READING_GUIDE_MUTATION = gql`
  mutation updateReadingGuide($input: UpdateReadingGuideInput!) {
    updateReadingGuide(input: $input) {
      readingGuide {
        _id
      }
    }
  }
`
export const CompleteReadingGuide: FC<CompleteReadingGuideProps> = ({
  readingGuideInfo,
}) => {
  const [state, event] = useReadingGuideToCompleteContextProvider()

  const { informationStructureEnum } = useEnumContextProvider()
  const [infoStructureList, handleChecks] = useCheckBox(
    state.context.updateReadingGuideInputs.howIsSectionOrganized!
  )

  const [questionToClarify, setQuestionToClarify] = useState('')
  const [clarifyingQuestions, setClarifyingQuestions] = useState<string[]>(
    state.context.updateReadingGuideInputs.clarifyingQuestions
  )

  const handleDelete = (index: number) => {
    setClarifyingQuestions((list) => [
      ...list.slice(0, index),
      ...list.slice(index + 1),
    ])
  }
  console.log(state.context.updateReadingGuideInputs.clarifyingQuestions)
  const [updateReadingGuide] = useMutation<
    updateReadingGuide,
    updateReadingGuideVariables
  >(UPDATE_READING_GUIDE_MUTATION, {
    variables: { input: state.context.updateReadingGuideInputs },
    onCompleted: (data) => console.log(data.updateReadingGuide.readingGuide),
    refetchQueries: ['findReadingGuideById'],
  })

  useEffect(() => {
    updateReadingGuide()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.updateReadingGuideInputs])

  useEffect(() => {
    event({ type: 'SET_HOW_IS_ORGANIZED', payload: infoStructureList })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoStructureList])

  useEffect(() => {
    event({ type: 'SET_CLARIFYING_QUESTION', payload: clarifyingQuestions })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clarifyingQuestions])

  const multipleSections =
    readingGuideInfo.lessonInfo.assignedSectionIdList.length > 1

  return (
    <>
      <ReadingGuideHeader>
        <div>Reading Guide</div>
      </ReadingGuideHeader>
      {state.matches('questions') && (
        <>
          <SectionOrganizationContainer
            onMouseOver={() =>
              event({ type: 'SET_HELP', payload: 'howIsSectionOrganized' })
            }
          >
            <div>
              {multipleSections ? (
                <>
                  <span>
                    1. How is the information in these sections organized?
                  </span>{' '}
                  <span style={{ color: 'var(--grey)' }}>
                    (Click as many as you think make sense)
                  </span>
                </>
              ) : (
                <>
                  <span>
                    1. How is the information in this sections organized?
                  </span>{' '}
                  <span style={{ color: 'var(--grey)' }}>
                    (Click as many as you think make sense)
                  </span>
                </>
              )}
            </div>
            <SectionOrganizationBodyContainer>
              {informationStructureEnum.map(
                (item: InformationStructureEnum) => (
                  <div key={item}>
                    <input
                      type='checkbox'
                      value={item}
                      checked={infoStructureList.includes(item)}
                      onChange={handleChecks}
                    />
                    <span>{informationStructure(item)}</span>
                  </div>
                )
              )}
            </SectionOrganizationBodyContainer>
          </SectionOrganizationContainer>
          <ReasonForOrganizationContainer>
            <div
              onMouseOver={() =>
                event({ type: 'SET_HELP', payload: 'whyWasSectionOrganized' })
              }
            >
              {infoStructureList.length > 1
                ? '2. Why do you think the author used these ways to organize the information?'
                : '2. Why do you think the author used this way to organize the information?'}
            </div>
            <ReadingGuideTextArea
              placeholder='Explain your thinking here...'
              onFocus={() =>
                event({ type: 'SET_HELP', payload: 'whyWasSectionOrganized' })
              }
              value={
                state.context.updateReadingGuideInputs.whyWasSectionOrganized
              }
              onChange={(e: any) =>
                event({ type: 'SET_WHY_IS_ORGANIZED', payload: e.target.value })
              }
            />
          </ReasonForOrganizationContainer>
          <MajorIssueContainer>
            <div
              onMouseOver={() =>
                event({ type: 'SET_HELP', payload: 'majorIssue' })
              }
            >
              {multipleSections
                ? '3. What was the major issue discussed in the sections'
                : '3. What was the major issue discussed in the section'}
            </div>
            <ReadingGuideInput
              onFocus={() => event({ type: 'SET_HELP', payload: 'majorIssue' })}
              value={state.context.updateReadingGuideInputs.majorIssue}
              onChange={(e: any) =>
                event({ type: 'SET_MAJOR_ISSUE', payload: e.target.value })
              }
            />
          </MajorIssueContainer>
          <MajorIssueSolvedContainer
            onMouseOver={() =>
              event({ type: 'SET_HELP', payload: 'majorIssueSolved' })
            }
          >
            {multipleSections
              ? '4. Was the issue handled or problem solved in the sections?'
              : '4. Was the issue handled or problem solved in the section?'}

            <ReadingGuideSelect
              onFocus={() =>
                event({ type: 'SET_HELP', payload: 'majorIssueSolved' })
              }
              value={
                state.context.updateReadingGuideInputs.majorIssueSolved
                  ? 'true'
                  : 'false'
              }
              onChange={(e: any) => {
                event({
                  type: 'SET_MAJOR_ISSUE_SOLVED',
                  payload: e.target.value === 'true' ? true : false,
                })
              }}
            >
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </ReadingGuideSelect>
          </MajorIssueSolvedContainer>
          {state.context.updateReadingGuideInputs.majorIssueSolved ? (
            <MajorSolutionContainer
              onMouseOver={() =>
                event({ type: 'SET_HELP', payload: 'majorSolution' })
              }
            >
              <div>5. How was the issue solved?</div>
              <ReadingGuideInput
                onFocus={() =>
                  event({ type: 'SET_HELP', payload: 'majorSolution' })
                }
                value={state.context.updateReadingGuideInputs.majorSolution}
                onChange={(e: any) =>
                  event({ type: 'SET_MAJOR_SOLUTION', payload: e.target.value })
                }
              />
            </MajorSolutionContainer>
          ) : (
            <MajorSolutionContainer
              onMouseOver={() =>
                event({ type: 'SET_HELP', payload: 'majorSolution' })
              }
            >
              <div>5. Why was the issue not solved?</div>
              <ReadingGuideInput
                onFocus={() =>
                  event({ type: 'SET_HELP', payload: 'majorSolution' })
                }
                value={state.context.updateReadingGuideInputs.majorSolution}
                onChange={(e: any) =>
                  event({
                    type: 'SET_MAJOR_SOLUTION',
                    payload: e.target.value,
                  })
                }
              />
            </MajorSolutionContainer>
          )}
        </>
      )}
      {state.matches('clarifyingQuestions') && (
        <ClarifyingQuestionsContainer
          onMouseOver={() =>
            event({ type: 'SET_HELP', payload: 'clarifyingQuestions' })
          }
        >
          <ClarifyingQuestionsTitle>
            6. Come up with at least one (or more) questions that would help you
            understand the section better.
          </ClarifyingQuestionsTitle>
          <ClarifyingQuestionsForm onSubmit={(e: any) => e.preventDefault()}>
            <ClarifyingQuestionsTextArea
              onFocus={() =>
                event({ type: 'SET_HELP', payload: 'clarifyingQuestions' })
              }
              onChange={(e: any) => setQuestionToClarify(e.target.value)}
            />
            <ClarifyingQuestionsAddButton
              type='reset'
              onClick={() => {
                setClarifyingQuestions((list) => [...list, questionToClarify])
                setQuestionToClarify('')
              }}
            >
              Add Question
            </ClarifyingQuestionsAddButton>
          </ClarifyingQuestionsForm>
          <ClarifyingQuestionsSubmittedQuestionsDisplay>
            <ClarifyingQuestionsSubmittedQuestionTitle>
              Click on Question to Delete
            </ClarifyingQuestionsSubmittedQuestionTitle>
            <ClarifyingQuestionsBlock>
              {clarifyingQuestions.map((question, i) => (
                <ClarifyingQuestionsSubmittedQuestion key={i}>
                  <span onMouseOver={() => {}} onClick={() => handleDelete(i)}>
                    {i + 1}. {question}
                  </span>
                </ClarifyingQuestionsSubmittedQuestion>
              ))}
            </ClarifyingQuestionsBlock>
          </ClarifyingQuestionsSubmittedQuestionsDisplay>
        </ClarifyingQuestionsContainer>
      )}

      {state.matches('clarifyingQuestions') ? (
        <SubmitReadingGuideContainer>
          <SubmitReadingGuideButton onClick={() => event({ type: 'PREVIOUS' })}>
            Back
          </SubmitReadingGuideButton>
          <SubmitReadingGuide />
        </SubmitReadingGuideContainer>
      ) : (
        <SubmitReadingGuideContainer>
          <SubmitReadingGuideButton onClick={() => event({ type: 'NEXT' })}>
            Next
          </SubmitReadingGuideButton>
        </SubmitReadingGuideContainer>
      )}
    </>
  )
}
