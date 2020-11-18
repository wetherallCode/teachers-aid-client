import React, { FC, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateProblemSolution,
  updateProblemSolutionVariables,
} from '../../../../../../../../schemaTypes'
import { UPDATE_PROBLEM_SOLUTION_MUTATION } from '../../../assigned-essays/organizers/academic/AcademicProblemSolution'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import {
  AcademicQuestionAnswerTypeContainer,
  AcademicRestatementTitle,
  AnswerTypeContainter,
  PartInput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'

export type AcademicProblemSolutionProps = {}

export const AcademicProblemSolution: FC<AcademicProblemSolutionProps> = () => {
  const [state, event] = useCompletedEssayContextProvider()
  const { subject } = state.context.academicOrganizer.academicSentenceStructure

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
    // onCompleted: (data) => console.log(data),
    // refetchQueries: ['findCompletedEssayById'],
  })

  useEffect(() => {
    if (
      state.context.academicOrganizer.questionType === 'HOW_PROBLEM_SOLUTION'
    ) {
      updateProblemSolution()
    }
  }, [
    problemSolution,
    state.context.academicOrganizer.questionType,
    updateProblemSolution,
  ])

  return (
    <>
      <AcademicQuestionAnswerTypeContainer>
        <AcademicRestatementTitle>
          <div>How Question: Problem and Solution</div>
        </AcademicRestatementTitle>
        <AnswerTypeContainter>
          <div>What is the problem for {subject}?</div>
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
          <div>Why is this {subject}'s problem?</div>
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
          <div>How did {subject} solve the problem?</div>
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
          <div>Why did the solution solve {subject}'s problem?</div>
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
            event({ type: 'QUESTION_TYPE' })
            // event({ type: 'SET_PRE_LOADED', payload: false })
          }}
        >
          Back
        </OrganizerControlButton>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'CONCLUSION' })
          }}
        >
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
