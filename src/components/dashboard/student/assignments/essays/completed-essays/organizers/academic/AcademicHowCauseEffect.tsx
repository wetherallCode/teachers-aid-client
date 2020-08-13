import React, { FC, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateHowCauseEffect,
  updateHowCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import { UPDATE_HOW_CAUSE_EFFECT_MUTATION } from '../../../assigned-essays/organizers/academic/AcademicHowCauseEffect'

export type AcademicHowCauseEffectProps = {}

export const AcademicHowCauseEffect: FC<AcademicHowCauseEffectProps> = () => {
  const [state, event] = useCompletedEssayContextProvider()

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
    if (state.context.academicOrganizer.questionType === 'HOW_CAUSE_EFFECT') {
      updateHowCauseEffect()
    }
  }, [
    howCauseEffect,
    state.context.academicOrganizer.questionType,
    updateHowCauseEffect,
  ])
  return (
    <>
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
    </>
  )
}
