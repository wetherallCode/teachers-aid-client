import React, { FC, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  findReadingGuideById_findReadingGuideById_readingGuide,
  updateReadingGuide,
  updateReadingGuideVariables,
} from '../../../../../../schemaTypes'
import { useReadingGuideToCompleteContextProvider } from '../state-and-styles/ReadingGuideToCompleteContext'
import { useCheckBox } from '../../../../../../hooks/useCheckBox'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
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
  Required,
  ReadingGuideProblemsQuestionContainer,
  InputAndButtonContainer,
  BlueButton,
  ProblemsListContainer,
  ReadingGuideBiggestProblemContainer,
  BiggestProblemListItem,
  ReadingGuideReasonForBiggestProblemContainer,
  Title,
  SmallBlueButton,
  ImportantPeopleContainer,
  HowAreImportantPeopleContectedContainer,
  SectionConsequencesContainer,
  GreyButton,
  ButtonContainer,
  ProblemsListItem,
  ProblemsLisContainerTitle,
  ProblemsToSelectContainer,
  NextButton,
  SmallNextButton,
} from '../state-and-styles/readingGuideStyles'

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

export type ReadingGuideStepsTypes =
  | 'problems'
  | 'biggestProblem'
  | 'reasonForBiggestProblem'
  | 'importantPeople'
  | 'howArePeopleInvolvedInProblems'
  | 'sectionConsequences'

export const CompleteReadingGuide = ({
  readingGuideInfo,
}: CompleteReadingGuideProps) => {
  const [state, event] = useReadingGuideToCompleteContextProvider()
  const [readingGuideSteps, setReadingGuideSteps] =
    useState<ReadingGuideStepsTypes>('problems')

  const [problem, setProblem] = useState('')
  const [problemList, setProblemList] = useState(
    state.context.updateReadingGuideInputs.problems
  )
  const [importantPeople, setImportantPeople] = useState('')
  const [importantPeopleList, setImportantPeopleList] = useState(
    state.context.updateReadingGuideInputs.importantPeople
  )

  // const { informationStructureEnum } = useEnumContextProvider()
  // const [infoStructureList, handleChecks] = useCheckBox(
  //   state.context.updateReadingGuideInputs.howIsSectionOrganized!
  // )

  // const [questionToClarify, setQuestionToClarify] = useState('')
  // const [clarifyingQuestions, setClarifyingQuestions] = useState<string[]>(
  //   state.context.updateReadingGuideInputs.clarifyingQuestions
  // )

  // const handleDelete = (index: number) => {
  //   setClarifyingQuestions((list) => [
  //     ...list.slice(0, index),
  //     ...list.slice(index + 1),
  //   ])
  // }

  const [updateReadingGuide] = useMutation<
    updateReadingGuide,
    updateReadingGuideVariables
  >(UPDATE_READING_GUIDE_MUTATION, {
    variables: { input: state.context.updateReadingGuideInputs },
    onCompleted: (data) => 'updated',
    refetchQueries: ['findReadingGuideById'],
  })

  useEffect(() => {
    updateReadingGuide()
  }, [state.context.updateReadingGuideInputs])

  // useEffect(() => {
  //   event({ type: 'SET_HOW_IS_ORGANIZED', payload: infoStructureList })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [infoStructureList])

  // useEffect(() => {
  //   event({ type: 'SET_CLARIFYING_QUESTION', payload: clarifyingQuestions })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [clarifyingQuestions])

  const multipleSections =
    readingGuideInfo.lessonInfo!.assignedSectionIdList.length > 1
  const handleFinishProblemList = () => {
    // event({
    // 	type: 'SET_READING_GUIDE_PROPERTIES',
    // 	keyName: 'problems',
    // 	payload: problemList,
    // })
    setReadingGuideSteps('biggestProblem')
  }
  const handleFinishImportantPeopleList = () => {
    // event({
    // 	type: 'SET_READING_GUIDE_PROPERTIES',
    // 	keyName: 'importantPeople',
    // 	payload: importantPeopleList,
    // })
    setReadingGuideSteps('howArePeopleInvolvedInProblems')
  }

  const handleDeleteProblem = (problem: string) => {
    const index = state.context.updateReadingGuideInputs.problems.findIndex(
      (i) => i === problem
    )
    event({ type: 'REMOVE_PROBLEM', payload: index })
  }
  const handleDeleteImportantPeople = (person: string) => {
    const index =
      state.context.updateReadingGuideInputs.importantPeople.findIndex(
        (i) => i === person
      )
    event({ type: 'REMOVE_IMPORTANT_PEOPLE', payload: index })
  }

  return (
    <>
      <ReadingGuideHeader>
        <div>Reading Guide</div>
      </ReadingGuideHeader>
      {state.matches('questions') && (
        <>
          {readingGuideSteps === 'problems' && (
            <ReadingGuideProblemsQuestionContainer
              onSubmit={(e) => e.preventDefault()}
            >
              <Title>
                List as many problems that are being faced in{' '}
                {multipleSections ? 'these sections' : 'this section'} as you
                can?
              </Title>
              <InputAndButtonContainer>
                <ReadingGuideInput
                  autoFocus={true}
                  onChange={(e) => setProblem(e.target.value)}
                />
                {problem.length > 0 ? (
                  <BlueButton
                    type='reset'
                    onClick={() => {
                      // setProblemList([...problemList, problem])
                      event({
                        type: 'SET_PROBLEM_LIST',
                        payload: [
                          ...state.context.updateReadingGuideInputs.problems,
                          problem,
                        ],
                      })
                      // setProblem('')
                    }}
                  >
                    Add Problem
                  </BlueButton>
                ) : (
                  <GreyButton></GreyButton>
                )}
              </InputAndButtonContainer>
              <ProblemsListContainer>
                {state.context.updateReadingGuideInputs.problems.length > 0 ? (
                  <ProblemsLisContainerTitle>
                    Click to Delete
                  </ProblemsLisContainerTitle>
                ) : (
                  <div></div>
                )}
                <div>
                  {state.context.updateReadingGuideInputs.problems.map(
                    (problem: string, i: number) => (
                      <ProblemsListItem
                        key={i}
                        onClick={() => handleDeleteProblem(problem)!}
                      >
                        {problem}
                      </ProblemsListItem>
                    )
                  )}
                </div>
              </ProblemsListContainer>

              <ButtonContainer>
                {state.context.updateReadingGuideInputs.problems.length > 0 ? (
                  <NextButton onClick={handleFinishProblemList}>
                    Next
                  </NextButton>
                ) : (
                  <NextButton>Add a problem before moving forward</NextButton>
                )}
              </ButtonContainer>
            </ReadingGuideProblemsQuestionContainer>
          )}
          {readingGuideSteps === 'biggestProblem' && (
            <ReadingGuideBiggestProblemContainer>
              <Title>Click the problem you think is the biggest problem?</Title>
              <ProblemsToSelectContainer>
                {state.context.updateReadingGuideInputs.problems.map(
                  (problem: string, i: number) => (
                    <BiggestProblemListItem
                      key={i}
                      selected={
                        state.context.updateReadingGuideInputs
                          .biggestProblem === problem
                      }
                      onClick={() =>
                        event({
                          type: 'SET_READING_GUIDE_PROPERTIES',
                          keyName: 'biggestProblem',
                          payload: problem,
                        })
                      }
                    >
                      {problem}
                    </BiggestProblemListItem>
                  )
                )}
              </ProblemsToSelectContainer>
              {state.context.updateReadingGuideInputs.biggestProblem && (
                <ButtonContainer>
                  <NextButton onClick={() => setReadingGuideSteps('problems')}>
                    Back
                  </NextButton>
                  <NextButton
                    onClick={() =>
                      setReadingGuideSteps('reasonForBiggestProblem')
                    }
                  >
                    Next
                  </NextButton>
                </ButtonContainer>
              )}
            </ReadingGuideBiggestProblemContainer>
          )}
          {readingGuideSteps === 'reasonForBiggestProblem' && (
            <ReadingGuideReasonForBiggestProblemContainer>
              <Title>
                Why do you think '
                {state.context.updateReadingGuideInputs.biggestProblem}' is the
                biggest problem?
              </Title>
              <ReadingGuideInput
                autoFocus={true}
                value={
                  state.context.updateReadingGuideInputs.reasonForBiggestProblem
                }
                onChange={(e) =>
                  event({
                    type: 'SET_READING_GUIDE_PROPERTIES',
                    keyName: 'reasonForBiggestProblem',
                    payload: e.target.value,
                  })
                }
              />
              {state.context.updateReadingGuideInputs
                .reasonForBiggestProblem && (
                <ButtonContainer>
                  <SmallNextButton
                    onClick={() => setReadingGuideSteps('biggestProblem')}
                  >
                    Back
                  </SmallNextButton>
                  <SmallNextButton
                    onClick={() => setReadingGuideSteps('importantPeople')}
                  >
                    Next
                  </SmallNextButton>
                </ButtonContainer>
              )}
            </ReadingGuideReasonForBiggestProblemContainer>
          )}
          {readingGuideSteps === 'importantPeople' && (
            <ImportantPeopleContainer>
              <Title>
                Who are the most important people discussed in{' '}
                {multipleSections ? 'these sections' : 'this section'}?
              </Title>
              <InputAndButtonContainer>
                <ReadingGuideInput
                  autoFocus={true}
                  onChange={(e) => setImportantPeople(e.target.value)}
                />
                {importantPeople.length > 0 ? (
                  <BlueButton
                    type='reset'
                    onClick={() => {
                      // setImportantPeopleList([...importantPeopleList, importantPeople])
                      event({
                        type: 'SET_IMPORTANT_PEOPLE_LIST',
                        payload: [
                          ...state.context.updateReadingGuideInputs
                            .importantPeople,
                          importantPeople,
                        ],
                      })
                    }}
                  >
                    Add Person
                  </BlueButton>
                ) : (
                  <GreyButton></GreyButton>
                )}
              </InputAndButtonContainer>
              <ProblemsListContainer>
                {state.context.updateReadingGuideInputs.importantPeople.length >
                0 ? (
                  <ProblemsLisContainerTitle>
                    Click to Delete
                  </ProblemsLisContainerTitle>
                ) : (
                  <div></div>
                )}
                <div>
                  {state.context.updateReadingGuideInputs.importantPeople.map(
                    (person: string, i: number) => (
                      <ProblemsListItem
                        key={i}
                        onClick={() => handleDeleteImportantPeople(person)!}
                      >
                        {person}
                      </ProblemsListItem>
                    )
                  )}
                </div>
              </ProblemsListContainer>
              {state.context.updateReadingGuideInputs.importantPeople.length >
                0 && (
                <ButtonContainer>
                  <SmallNextButton
                    onClick={() =>
                      setReadingGuideSteps('reasonForBiggestProblem')
                    }
                  >
                    Back
                  </SmallNextButton>
                  <SmallNextButton
                    onClick={() =>
                      setReadingGuideSteps('howArePeopleInvolvedInProblems')
                    }
                  >
                    Next
                  </SmallNextButton>
                </ButtonContainer>
              )}
            </ImportantPeopleContainer>
          )}
          {readingGuideSteps === 'howArePeopleInvolvedInProblems' && (
            <HowAreImportantPeopleContectedContainer>
              <Title>
                How{' '}
                {state.context.updateReadingGuideInputs.importantPeople.length >
                1
                  ? 'are these people'
                  : 'is this person'}{' '}
                involved in the{' '}
                {state.context.updateReadingGuideInputs.problems.length > 1
                  ? 'problems'
                  : 'problem'}{' '}
                you just mentioned?
              </Title>
              <Title>
                {state.context.updateReadingGuideInputs.importantPeople.map(
                  (importantPeople: string, i: number) => (
                    <div key={i}>{importantPeople}</div>
                  )
                )}
              </Title>
              <ReadingGuideTextArea
                autoFocus={true}
                value={
                  state.context.updateReadingGuideInputs
                    .howArePeopleInvolvedInProblems
                }
                onChange={(e) =>
                  event({
                    type: 'SET_READING_GUIDE_PROPERTIES',
                    keyName: 'howArePeopleInvolvedInProblems',
                    payload: e.target.value,
                  })
                }
              />
              {state.context.updateReadingGuideInputs
                .howArePeopleInvolvedInProblems && (
                <ButtonContainer>
                  <SmallNextButton
                    onClick={() => setReadingGuideSteps('importantPeople')}
                  >
                    Back
                  </SmallNextButton>
                  <SmallNextButton
                    onClick={() => setReadingGuideSteps('sectionConsequences')}
                  >
                    Next
                  </SmallNextButton>
                </ButtonContainer>
              )}
            </HowAreImportantPeopleContectedContainer>
          )}
          {readingGuideSteps === 'sectionConsequences' && (
            <SectionConsequencesContainer>
              <Title>
                List a potential consequence of{' '}
                {multipleSections ? 'these sections' : 'this section'}.
              </Title>
              <ReadingGuideInput
                autoFocus={true}
                value={
                  state.context.updateReadingGuideInputs.sectionConsequences
                }
                onChange={(e) =>
                  event({
                    type: 'SET_READING_GUIDE_PROPERTIES',
                    keyName: 'sectionConsequences',
                    payload: e.target.value,
                  })
                }
              />
              {state.context.updateReadingGuideInputs.sectionConsequences && (
                <ButtonContainer>
                  <SmallNextButton
                    onClick={() =>
                      setReadingGuideSteps('howArePeopleInvolvedInProblems')
                    }
                  >
                    Back
                  </SmallNextButton>
                  <SubmitReadingGuide readingGuideInfo={readingGuideInfo} />
                </ButtonContainer>
              )}
            </SectionConsequencesContainer>
          )}
        </>
      )}
    </>
  )
}
