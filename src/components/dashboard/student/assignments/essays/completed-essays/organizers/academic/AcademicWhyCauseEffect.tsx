import React, { FC, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateWhyCauseEffect,
  updateWhyCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import { UPDATE_WHY_CAUSE_EFFECT_MUTATION } from '../../../assigned-essays/organizers/academic/AcademicWhyCauseEffect'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'

export type AcademicWhyCauseEffectProps = {}

export const AcademicWhyCauseEffect: FC<AcademicWhyCauseEffectProps> = () => {
  const [state, event] = useCompletedEssayContextProvider()

  const { whyCauseEffect } = state.context.academicOrganizer.answer

  const {
    subject,
    verb,
  } = state.context.academicOrganizer.academicSentenceStructure

  const [updateWhyCauseEffect] = useMutation<
    updateWhyCauseEffect,
    updateWhyCauseEffectVariables
  >(UPDATE_WHY_CAUSE_EFFECT_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        ultimateCause:
          state.context.academicOrganizer.answer.whyCauseEffect.ultimateCause,
        proximateCause:
          state.context.academicOrganizer.answer.whyCauseEffect.proximateCause,
      },
    },
    onCompleted: (data) => console.log(data.updateWhyCauseEffect.essay),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    if (state.context.academicOrganizer.questionType === 'WHY_CAUSE_EFFECT') {
      updateWhyCauseEffect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whyCauseEffect, updateWhyCauseEffect])

  return (
    <>
      <div>Why: Cause and Effect</div>
      <div>
        Why did {subject} {verb}?
      </div>
      <input
        type='text'
        value={
          state.context.academicOrganizer.answer.whyCauseEffect.proximateCause
        }
        onChange={(e: any) => {
          event({
            type: 'SET_WHY_CAUSE_EFFECT',
            payload: { ...whyCauseEffect, proximateCause: e.target.value },
          })
        }}
      />
      <div>Why did that happen?</div>
      <input
        type='text'
        value={
          state.context.academicOrganizer.answer.whyCauseEffect.ultimateCause
        }
        onChange={(e: any) => {
          event({
            type: 'SET_WHY_CAUSE_EFFECT',
            payload: { ...whyCauseEffect, ultimateCause: e.target.value },
          })
        }}
      />
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
