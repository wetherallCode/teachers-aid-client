import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { useMutation, gql } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateWhyCauseEffect,
  updateWhyCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import {
  AcademicQuestionAnswerTypeContainer,
  AcademicRestatementTitle,
  AnswerTypeContainter,
  PartInput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../state-and-styles/assignedEssayStyles'

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
      <AcademicQuestionAnswerTypeContainer>
        <AcademicRestatementTitle>
          <div>Why Question: Cause and Effect</div>
        </AcademicRestatementTitle>
        <AnswerTypeContainter>
          <div>
            Why did {subject} {verb}?
          </div>
          <PartInput
            type='text'
            placeholder='Proximate Cause...'
            value={
              state.context.academicOrganizer.answer.whyCauseEffect
                .proximateCause
            }
            onChange={(e: any) => {
              event({
                type: 'SET_WHY_CAUSE_EFFECT',
                payload: { ...whyCauseEffect, proximateCause: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>Why did your Proximate Cause happen?</div>
          <PartInput
            type='text'
            placeholder='Ultimate Cause...'
            value={
              state.context.academicOrganizer.answer.whyCauseEffect
                .ultimateCause
            }
            onChange={(e: any) => {
              event({
                type: 'SET_WHY_CAUSE_EFFECT',
                payload: { ...whyCauseEffect, ultimateCause: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
      </AcademicQuestionAnswerTypeContainer>
      <OrganizerControlButtonContainer>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'PREVIOUS' })
            event({ type: 'SET_PRE_LOADED', payload: false })
          }}
        >
          Back
        </OrganizerControlButton>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'NEXT' })
          }}
        >
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
