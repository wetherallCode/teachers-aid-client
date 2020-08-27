import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateProblemSolution,
  updateProblemSolutionVariables,
} from '../../../../../../../../schemaTypes'
import { UPDATE_PROBLEM_SOLUTION_MUTATION } from '../academic/AcademicProblemSolution'

export type AdvancedHowProblemSolutionProps = {}

export const AdvancedHowProblemSolution: FC<AdvancedHowProblemSolutionProps> = () => {
  const [state, event] = useStudentEssayContextProvider()
  const { subject } = state.context.advancedOrganizer.advancedSentenceStructure
  const { problemSolution } = state.context.advancedOrganizer.answer

  const [updateProblemSolution] = useMutation<
    updateProblemSolution,
    updateProblemSolutionVariables
  >(UPDATE_PROBLEM_SOLUTION_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        problem: state.context.advancedOrganizer.answer.problemSolution.problem,
        reasonForProblem:
          state.context.advancedOrganizer.answer.problemSolution
            .reasonForProblem,
        solvedBy:
          state.context.advancedOrganizer.answer.problemSolution.solvedBy,
        whySolutionSolved:
          state.context.advancedOrganizer.answer.problemSolution
            .whySolutionSolved,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    updateProblemSolution()
  }, [problemSolution, updateProblemSolution])

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
        value={state.context.advancedOrganizer.answer.problemSolution.problem}
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
          state.context.advancedOrganizer.answer.problemSolution
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
        value={state.context.advancedOrganizer.answer.problemSolution.solvedBy}
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
          state.context.advancedOrganizer.answer.problemSolution
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
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
