import React, { FC, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateHowCauseEffect,
  updateHowCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import {
  AcademicQuestionAnswerTypeContainer,
  AcademicRestatementTitle,
  AnswerTypeContainter,
  PartInput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../state-and-styles/assignedEssayStyles'

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
      <AcademicQuestionAnswerTypeContainer>
        <AcademicRestatementTitle>
          <div>How Question: Cause and Effect</div>
        </AcademicRestatementTitle>
        <AnswerTypeContainter>
          <div>
            What was {object} like before {subject} {verb}ed
          </div>
          <PartInput
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
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>
            How was {object} different because of {subject}?
          </div>
          <PartInput
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
        </OrganizerControlButton>{' '}
      </OrganizerControlButtonContainer>
    </>
  )
}
