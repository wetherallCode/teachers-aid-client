import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../StudentEssayContext'
import { useMutation, gql } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateProblemSolution,
  updateProblemSolutionVariables,
} from '../../../../../../../../schemaTypes'

export type AcademicProblemSolutionProps = {}

export const UPDATE_PROBLEM_SOLUTION_MUTATION = gql`
  mutation updateProblemSolution($input: UpdateProblemSolutionInput!) {
    updateProblemSolution(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const AcademicProblemSolution: FC<AcademicProblemSolutionProps> = () => {
  const [state, event] = useStudentEssayContextProvider()
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

  return (
    <>
      <button
        onClick={() => {
          event({ type: 'PREVIOUS' })
          event({ type: 'SET_PRE_LOADED', payload: false })
        }}
      >
        Change Question Type
      </button>
      <div>How: Problem and Solution</div>
      <div>What is the problem for {subject}?</div>
      <input
        value={state.context.academicOrganizer.answer.problemSolution.problem}
        onChange={(e: any) => {
          event({
            type: 'SET_PROBLEM_SOLUTION',
            payload: { ...problemSolution, problem: e.target.value },
          })
        }}
      />
      <div>Why is this {subject}'s problem?</div>
      <input
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
      <div>How did {subject} solve the problem?</div>
      <input
        value={state.context.academicOrganizer.answer.problemSolution.solvedBy}
        onChange={(e: any) => {
          event({
            type: 'SET_PROBLEM_SOLUTION',
            payload: { ...problemSolution, solvedBy: e.target.value },
          })
        }}
      />
      <div>Why did the solution solve {subject}'s problem?</div>
      <input
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
      <button
        onClick={() => {
          event({ type: 'NEXT' })
        }}
      >
        Next
      </button>
    </>
  )
}
