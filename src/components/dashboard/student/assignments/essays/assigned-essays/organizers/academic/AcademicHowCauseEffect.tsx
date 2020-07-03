import React, { FC, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateHowCauseEffect,
  updateHowCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from '../../StudentEssayContext'

export type AcademicHowCauseEffectProps = {}

export const UPDATE_HOW_CAUSE_EFFECT_MUTATION = gql`
  mutation updateHowCauseEffect($input: UpdateHowCauseEffectInput!) {
    updateHowCauseEffect(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const AcademicHowCauseEffect: FC<AcademicHowCauseEffectProps> = () => {
  const [state, event] = useStudentEssayContextProvider()

  const [updateHowCauseEffect] = useMutation<
    updateHowCauseEffect,
    updateHowCauseEffectVariables
  >(UPDATE_HOW_CAUSE_EFFECT_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        before: state.context.academicOrganizer.answer.howCauseEffect.before,
        cause: state.context.academicOrganizer.answer.howCauseEffect.cause,
        after: state.context.academicOrganizer.answer.howCauseEffect.after,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })
  const {
    subject,
    verb,
    object,
  } = state.context.academicOrganizer.academicSentenceStructure
  const { howCauseEffect } = state.context.academicOrganizer.answer

  useEffect(() => {
    updateHowCauseEffect()
  }, [
    howCauseEffect,
    state.context.academicOrganizer.answer.howCauseEffect.after,
    updateHowCauseEffect,
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
      <div>How: Cause and Effect</div>
      <div>
        What was {object} like before {subject} {verb}ed
      </div>
      <input
        value={state.context.academicOrganizer.answer.howCauseEffect.before}
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
        How was {object} different because of {subject}?
      </div>
      <input
        value={state.context.academicOrganizer.answer.howCauseEffect.after}
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
