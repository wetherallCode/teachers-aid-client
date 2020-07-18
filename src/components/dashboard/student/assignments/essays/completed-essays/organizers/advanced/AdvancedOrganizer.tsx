import React, { FC, useEffect, useState } from 'react'
import { useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  updateAdvancedOrganizer,
  updateAdvancedOrganizerVariables,
  findCompletedEssayById_findEssayById_essay,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType,
} from '../../../../../../../../schemaTypes'

import { AdvancedAnswerTypes } from './AdvancedAnswerTypes'

import { AdvancedRestatement } from './AdvancedRestatement'
import { AdvancedConclusion } from './AdvancedConclusion'
import { useCompletedEssayContextProvider } from '../../CompletedEssayContext'
import { UPDATE_ADVANCED_ORGANIZER_MUTATION } from '../../../assigned-essays/organizers/advanced/AdvancedOrganizer'

export type AdvancedOrganizerProps = {
  question: string
  essay: findCompletedEssayById_findEssayById_essay
}

export type UpdateAdvancedOrganizerType = (
  options?:
    | MutationFunctionOptions<
        updateAdvancedOrganizer,
        updateAdvancedOrganizerVariables
      >
    | undefined
) => void

export const AdvancedOrganizer: FC<AdvancedOrganizerProps> = ({
  question,
  essay,
}) => {
  const advancedOrganizer = essay.workingDraft
    .organizer as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer
  const [loading, setLoading] = useState(false)
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    event({
      type: 'SET_FULL_QUESTION_TYPE',
      payload: advancedOrganizer.questionType!,
    })

    if (advancedOrganizer.questionType === 'HOW_PROBLEM_SOLUTION') {
      const {
        problem,
        reasonForProblem,
        solvedBy,
        whySolutionSolved,
      } = advancedOrganizer.answerType as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType
      event({
        type: 'SET_PROBLEM_SOLUTION',
        payload: {
          problem: problem,
          reasonForProblem: reasonForProblem,
          solvedBy: solvedBy,
          whySolutionSolved: whySolutionSolved,
        },
      })
    }
    if (advancedOrganizer.questionType === 'HOW_CAUSE_EFFECT') {
      const {
        before,
        cause,
        after,
      } = advancedOrganizer.answerType as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType
      event({
        type: 'SET_HOW_CAUSE_EFFECT',
        payload: { before: before, cause: cause, after: after },
      })
    }
    if (advancedOrganizer.questionType === 'WHY_CAUSE_EFFECT') {
      const {
        ultimateCause,
        proximateCause,
      } = advancedOrganizer.answerType as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType
      event({
        type: 'SET_WHY_CAUSE_EFFECT',
        payload: {
          ultimateCause: ultimateCause,
          proximateCause: proximateCause,
        },
      })
    }
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advancedOrganizer])

  const [updateAdvancedOrganizer] = useMutation<
    updateAdvancedOrganizer,
    updateAdvancedOrganizerVariables
  >(UPDATE_ADVANCED_ORGANIZER_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        advancedSentenceStructure:
          state.context.advancedOrganizer.advancedSentenceStructure,
        restatement: state.context.advancedOrganizer.restatement,
        conclusion: state.context.advancedOrganizer.conclusion,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })

  return (
    <>
      <div>advancedOrganizer</div>
      <div>{question}</div>

      <AdvancedRestatement updateAdvancedOrganizer={updateAdvancedOrganizer} />

      {loading && <AdvancedAnswerTypes advancedOrganizer={advancedOrganizer} />}

      <AdvancedConclusion updateAdvancedOrganizer={updateAdvancedOrganizer} />
    </>
  )
}
