import React, { FC, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateWhyCauseEffect,
  updateWhyCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import { UPDATE_WHY_CAUSE_EFFECT_MUTATION } from '../../../assigned-essays/organizers/academic/AcademicWhyCauseEffect'

export type AdvancedWhyCauseEffectProps = {}

export const AdvancedWhyCauseEffect: FC<AdvancedWhyCauseEffectProps> = () => {
  const [state, event] = useCompletedEssayContextProvider()
  const {
    subject,
    verb,
  } = state.context.advancedOrganizer.advancedSentenceStructure
  const { whyCauseEffect } = state.context.advancedOrganizer.answer

  const [updateWhyCauseEffect] = useMutation<
    updateWhyCauseEffect,
    updateWhyCauseEffectVariables
  >(UPDATE_WHY_CAUSE_EFFECT_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        ultimateCause:
          state.context.advancedOrganizer.answer.whyCauseEffect.ultimateCause,
        proximateCause:
          state.context.advancedOrganizer.answer.whyCauseEffect.proximateCause,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    updateWhyCauseEffect()
  }, [updateWhyCauseEffect, whyCauseEffect])

  return (
    <>
      <div>Why: Cause and Effect</div>
      <div>
        Why did {subject} {verb}?
      </div>
      <input
        type='text'
        value={
          state.context.advancedOrganizer.answer.whyCauseEffect.proximateCause
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
          state.context.advancedOrganizer.answer.whyCauseEffect.ultimateCause
        }
        onChange={(e: any) => {
          event({
            type: 'SET_WHY_CAUSE_EFFECT',
            payload: { ...whyCauseEffect, ultimateCause: e.target.value },
          })
        }}
      />
    </>
  )
}
