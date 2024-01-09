import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateHowCauseEffect,
  updateHowCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import { UPDATE_HOW_CAUSE_EFFECT_MUTATION } from '../academic/AcademicHowCauseEffect'

export type AdvancedHowCauseEffectProps = {}

export const AdvancedHowCauseEffect: FC<AdvancedHowCauseEffectProps> = () => {
  const [state, event] = useStudentEssayContextProvider()
  const { subject, verb, object } =
    state.context.advancedOrganizer.advancedSentenceStructure
  const { howCauseEffect } = state.context.advancedOrganizer.answer

  const [updateHowCauseEffect] = useMutation<
    updateHowCauseEffect,
    updateHowCauseEffectVariables
  >(UPDATE_HOW_CAUSE_EFFECT_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        before: state.context.advancedOrganizer.answer.howCauseEffect.before,
        cause: state.context.advancedOrganizer.answer.howCauseEffect.cause,
        after: state.context.advancedOrganizer.answer.howCauseEffect.after,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    updateHowCauseEffect()
  }, [howCauseEffect, updateHowCauseEffect])

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
      <div>How: Cause and Effect</div>
      <div>
        What was {object} like before {subject} {verb}ed
      </div>
      <input
        value={state.context.advancedOrganizer.answer.howCauseEffect.before}
        onChange={(e: any) => {
          event({
            type: 'SET_HOW_CAUSE_EFFECT',
            payload: {
              ...howCauseEffect,
              before: e.target.value,
            },
          })
        }}
      />
      <div>
        How was {object} different because of {subject}
      </div>
      <input
        value={state.context.advancedOrganizer.answer.howCauseEffect.after}
        onChange={(e: any) => {
          event({
            type: 'SET_HOW_CAUSE_EFFECT',
            payload: {
              ...howCauseEffect,
              after: e.target.value,
            },
          })
        }}
      />
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
