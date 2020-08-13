import React, { FC, useEffect, useState } from 'react'
import { useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  updateAcademicOrganizer,
  updateAcademicOrganizerVariables,
  findCompletedEssayById_findEssayById_essay,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType,
} from '../../../../../../../../schemaTypes'

import { AcademicAnswerTypes } from './AcademicAnswerTypes'
import { AcademicRestatement } from './AcademicRestatement'
import { AcademicConclusion } from './AcademicConclusion'

import { UPDATE_ACADEMIC_ORGANIZER_MUTATION } from '../../../assigned-essays/organizers/academic/AcademicOrganizer'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'

type AcademicOrganizerProps = {
  question: string
  essay: findCompletedEssayById_findEssayById_essay
}

export type UpdateAcademicOrganizerType = (
  options?:
    | MutationFunctionOptions<
        updateAcademicOrganizer,
        updateAcademicOrganizerVariables
      >
    | undefined
) => void

export const AcademicOrganizer: FC<AcademicOrganizerProps> = ({
  question,
  essay,
}) => {
  const academicOrganizer = essay.workingDraft
    .organizer as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer
  const [loading, setLoading] = useState(false)
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    event({
      type: 'SET_FULL_QUESTION_TYPE',
      payload: academicOrganizer.questionType!,
    })

    if (academicOrganizer.questionType === 'HOW_PROBLEM_SOLUTION') {
      const {
        problem,
        reasonForProblem,
        solvedBy,
        whySolutionSolved,
      } = academicOrganizer.answerType as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType
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
    if (academicOrganizer.questionType === 'HOW_CAUSE_EFFECT') {
      const {
        before,
        cause,
        after,
      } = academicOrganizer.answerType as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType
      event({
        type: 'SET_HOW_CAUSE_EFFECT',
        payload: { before: before, cause: cause, after: after },
      })
    }
    if (academicOrganizer.questionType === 'WHY_CAUSE_EFFECT') {
      const {
        ultimateCause,
        proximateCause,
      } = academicOrganizer.answerType as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType
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
  }, [academicOrganizer])

  const [updateAcademicOrganizer] = useMutation<
    updateAcademicOrganizer,
    updateAcademicOrganizerVariables
  >(UPDATE_ACADEMIC_ORGANIZER_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        academicSentenceStructure:
          state.context.academicOrganizer.academicSentenceStructure,
        restatement: state.context.academicOrganizer.restatement,
        conclusion: state.context.academicOrganizer.conclusion,
      },
    },
    onCompleted: (data) => {
      // console.log(data.updateAcademicOrganizer.essay)
      // event({type: 'SET_FULL_QUESTION_TYPE', payload: })
    },
    onError: (err) => console.error(err),
    refetchQueries: ['findEssayById'],
  })

  return (
    <>
      <div>AcademicOrganizer</div>
      <div>{question}</div>

      <AcademicRestatement updateAcademicOrganizer={updateAcademicOrganizer} />

      {loading && <AcademicAnswerTypes academicOrganizer={academicOrganizer} />}

      <AcademicConclusion updateAcademicOrganizer={updateAcademicOrganizer} />
    </>
  )
}
