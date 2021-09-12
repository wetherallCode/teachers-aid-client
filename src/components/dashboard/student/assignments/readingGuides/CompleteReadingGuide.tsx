import React, { FC, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  updateReadingGuideVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateReadingGuide,
  findReadingGuideById_findReadingGuideById_readingGuide,
} from '../../../../../schemaTypes'
import { useReadingGuideToCompleteContextProvider } from './state-and-styles/ReadingGuideToCompleteContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
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

export type ReadingGuideStepsTypes =
  | 'problems'
  | 'biggestProblem'
  | 'reasonForBiggestProblem'
  | 'importantPeople'
  | 'howArePeopleInvolvedInProblems'
  | 'sectionConsequences'

export const CompleteReadingGuide: FC<CompleteReadingGuideProps> = ({
  readingGuideInfo,
}) => {
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
    readingGuideInfo.lessonInfo.assignedSectionIdList.length > 1
  const handleFinishProblemList = () => {
    event({
      type: 'SET_READING_GUIDE_PROPERTIES',
      keyName: 'problems',
      payload: problemList,
    })
    setReadingGuideSteps('biggestProblem')
  }
  const handleFinishImportantPeopleList = () => {
    event({
      type: 'SET_READING_GUIDE_PROPERTIES',
      keyName: 'importantPeople',
      payload: importantPeopleList,
    })
    setReadingGuideSteps('howArePeopleInvolvedInProblems')
  }
  console.log(state.context.updateReadingGuideInputs)
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
                  onChange={(e) => setProblem(e.target.value)}
                />
                {problem.length > 0 ? (
                  <BlueButton
                    type='reset'
                    onClick={() => setProblemList([...problemList, problem])}
                  >
                    Add Problem
                  </BlueButton>
                ) : (
                  <GreyButton></GreyButton>
                )}
              </InputAndButtonContainer>
              <ProblemsListContainer>
                {problemList.map((problem, i: number) => (
                  <div key={i}>{problem}</div>
                ))}
              </ProblemsListContainer>
              {problemList.length > 0 && (
                // <ButtonContainer>
                <BlueButton onClick={handleFinishProblemList}>Next</BlueButton>
                // </ButtonContainer>
              )}
            </ReadingGuideProblemsQuestionContainer>
          )}
          {readingGuideSteps === 'biggestProblem' && (
            <ReadingGuideBiggestProblemContainer>
              <Title>
                Select the problem do you think is the biggest problem?
              </Title>
              <ProblemsListContainer>
                {problemList.map((problem, i: number) => (
                  <BiggestProblemListItem
                    key={i}
                    selected={
                      state.context.updateReadingGuideInputs.biggestProblem ===
                      problem
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
                ))}
              </ProblemsListContainer>
              {state.context.updateReadingGuideInputs.biggestProblem && (
                <BlueButton
                  onClick={() =>
                    setReadingGuideSteps('reasonForBiggestProblem')
                  }
                >
                  Next
                </BlueButton>
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
                <SmallBlueButton
                  onClick={() => setReadingGuideSteps('importantPeople')}
                >
                  Next
                </SmallBlueButton>
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
                  onChange={(e) => setImportantPeople(e.target.value)}
                />
                {importantPeople.length > 0 ? (
                  <BlueButton
                    type='reset'
                    onClick={() =>
                      setImportantPeopleList([
                        ...importantPeopleList,
                        importantPeople,
                      ])
                    }
                  >
                    Add Person
                  </BlueButton>
                ) : (
                  <GreyButton></GreyButton>
                )}
              </InputAndButtonContainer>
              <ProblemsListContainer>
                {importantPeopleList.map((person, i: number) => (
                  <div key={i}>{person}</div>
                ))}
              </ProblemsListContainer>
              {importantPeopleList.length > 0 && (
                <SmallBlueButton onClick={handleFinishImportantPeopleList}>
                  Next
                </SmallBlueButton>
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
                {importantPeopleList.map((importantPeople, i: number) => (
                  <div key={i}>{importantPeople}</div>
                ))}
              </Title>
              <ReadingGuideTextArea
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
                <SmallBlueButton
                  onClick={() => setReadingGuideSteps('sectionConsequences')}
                >
                  Next
                </SmallBlueButton>
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
                  <SubmitReadingGuide />
                </ButtonContainer>
              )}
            </SectionConsequencesContainer>
          )}
        </>
      )}
    </>
  )
}
