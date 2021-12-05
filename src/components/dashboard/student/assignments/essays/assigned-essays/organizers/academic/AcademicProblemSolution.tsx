import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { useMutation, gql } from '@apollo/client'
import {
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateProblemSolution,
  updateProblemSolutionVariables,
} from '../../../../../../../../schemaTypes'
import {
  AcademicQuestionAnswerTypeContainer,
  QuestionTypeChangeButton,
  AnswerTypeContainter,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
  AcademicRestatementTitle,
  PartInput,
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  RestatementDirectionsContainer,
} from '../../state-and-styles/assignedEssayStyles'
import {
  irregularPastTenseVerbList,
  isLetterUpperCase,
} from '../../../../../../../../utils'
import { UnderlinedText } from '../../../../../../../../appStyles'

export type AcademicProblemSolutionProps = {
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
}

export const UPDATE_PROBLEM_SOLUTION_MUTATION = gql`
  mutation updateProblemSolution($input: UpdateProblemSolutionInput!) {
    updateProblemSolution(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const AcademicProblemSolution = ({
  questionParts,
}: AcademicProblemSolutionProps) => {
  const [state, event] = useStudentEssayContextProvider()

  const { subject, verb, object } =
    state.context.academicOrganizer.academicSentenceStructure
  const irregularVerbCheck = irregularPastTenseVerbList(verb)

  const { problemSolution } = state.context.academicOrganizer.answer

  const [updateProblemSolution] = useMutation<
    updateProblemSolution,
    updateProblemSolutionVariables
  >(UPDATE_PROBLEM_SOLUTION_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        problem: state.context.academicOrganizer.answer.problemSolution.problem,
        reasonForProblem:
          state.context.academicOrganizer.answer.problemSolution
            .reasonForProblem,
        solvedBy:
          state.context.academicOrganizer.answer.problemSolution.solvedBy,
        whySolutionSolved:
          state.context.academicOrganizer.answer.problemSolution
            .whySolutionSolved,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })
  useEffect(() => {
    updateProblemSolution()
  }, [
    problemSolution,
    updateProblemSolution,
    // state.context.academicOrganizer.answer.problemSolution,
  ])

  const congugatedVerb =
    verb === irregularVerbCheck
      ? irregularVerbCheck
          .charAt(irregularVerbCheck.length - 1)
          .toLowerCase() === 'e'
        ? verb + 'd'
        : verb + 'ed'
      : irregularVerbCheck

  const properNounCheck = (word: string) => {
    const firstLetter = word.charAt(0)

    if (isLetterUpperCase(firstLetter)) return true
    else return false
  }
  const noun =
    questionParts.simpleSubject.split(' ')[
      questionParts.simpleSubject.split(' ').length - 1
    ]
  const properNoun = properNounCheck(noun)
  const properNameEndsInS =
    properNoun &&
    questionParts.simpleSubject.charAt(
      questionParts.simpleSubject.length - 1
    ) === 's'

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Answer the Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <RestatementDirectionsContainer>
        <UnderlinedText>Directions</UnderlinedText>
        <div>
          Problem and Solution Questions need to give a complete explanation of
          the problem and then a complete explanation of the solution. To do
          this, answer each of these questions with paraphrased answers that you
          found in the text in the assigned sections or sections that came
          before the assigned sections.
        </div>
      </RestatementDirectionsContainer>
      <AcademicQuestionAnswerTypeContainer>
        <AcademicRestatementTitle>
          <div>How Question: Problem and Solution</div>
        </AcademicRestatementTitle>
        <AnswerTypeContainter>
          <div>What is the problem for {questionParts.simpleSubject}?</div>
          <PartInput
            value={
              state.context.academicOrganizer.answer.problemSolution.problem
            }
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: { ...problemSolution, problem: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>
            Why is this {questionParts.simpleSubject}
            {properNameEndsInS ? `'` : `'s`} problem?
          </div>
          <PartInput
            value={
              state.context.academicOrganizer.answer.problemSolution
                .reasonForProblem
            }
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: {
                  ...problemSolution,
                  reasonForProblem: e.target.value,
                },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>How did {questionParts.simpleSubject} solve the problem?</div>
          <PartInput
            value={
              state.context.academicOrganizer.answer.problemSolution.solvedBy
            }
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: { ...problemSolution, solvedBy: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>
            Why did the solution solve {questionParts.simpleSubject}
            {properNoun ? `'` : `'s`} problem?
          </div>
          <PartInput
            value={
              state.context.academicOrganizer.answer.problemSolution
                .whySolutionSolved
            }
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: {
                  ...problemSolution,
                  whySolutionSolved: e.target.value,
                },
              })
            }}
          />
        </AnswerTypeContainter>
      </AcademicQuestionAnswerTypeContainer>
      <OrganizerControlButtonContainer>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'PREVIOUS' })
            event({ type: 'SET_PRE_LOADED', payload: false })
          }}
        >
          Back
        </OrganizerControlButton>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'NEXT' })
          }}
        >
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
