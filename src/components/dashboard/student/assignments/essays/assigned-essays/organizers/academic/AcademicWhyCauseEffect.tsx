import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../StudentEssayContext'
import { useMutation, gql } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateWhyCauseEffect,
  updateWhyCauseEffectVariables,
} from '../../../../../../../../schemaTypes'

export type AcademicWhyCauseEffectProps = {}

export const UPDATE_WHY_CAUSE_EFFECT_MUTATION = gql`
  mutation updateWhyCauseEffect($input: UpdateWhyCauseEffectInput!) {
    updateWhyCauseEffect(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const AcademicWhyCauseEffect: FC<AcademicWhyCauseEffectProps> = () => {
  const [state, event] = useStudentEssayContextProvider()

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
    onCompleted: () => console.log('update Complete'),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    updateWhyCauseEffect()
  }, [whyCauseEffect, updateWhyCauseEffect])

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
