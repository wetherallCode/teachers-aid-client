import React, { FC, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {
  SubmittedFinalDraftsInput,
  resubmitEssayFinalDraft,
  resubmitEssayFinalDraftVariables,
} from '../../../../../../schemaTypes'
import {
  EssaySubmitButton,
  EssaySubmitCheck,
} from '../assigned-essays/state-and-styles/assignedEssayStyles'
import { useCompletedEssayContextProvider } from './state/CompletedEssayContext'

export type SubmitEssayFinalDraftInput = {
  _id: string
  submittedFinalDraft: SubmittedFinalDraftsInput
}

export const RESUBMIT_ESSAY_FINAL_DRAFT_MUTATION = gql`
  mutation resubmitEssayFinalDraft($input: ResubmitEssayFinalDraftInput!) {
    resubmitEssayFinalDraft(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const SubmitRedoneEssay: FC<SubmitEssayFinalDraftInput> = ({
  _id,
  submittedFinalDraft,
}) => {
  const [state, event] = useCompletedEssayContextProvider()
  const [submitToggle, setSubmitToggle] = useState(false)
  const navigate = useNavigate()

  const [resubmitFinalDraft, { called }] = useMutation<
    resubmitEssayFinalDraft,
    resubmitEssayFinalDraftVariables
  >(RESUBMIT_ESSAY_FINAL_DRAFT_MUTATION, {
    variables: {
      input: { essayId: _id, submittedFinalDraft: submittedFinalDraft },
    },
    onCompleted: () => {
      navigate('/dashboard/assignments')
    },
    refetchQueries: ['findCompletedEssaysByStudentId', 'findEssayById'],
  })

  return (
    // <button
    //   onClick={() => {
    //     resubmitFinalDraft()
    //   }}
    // >
    //   Resubmit
    // </button>
    <>
      {!submitToggle ? (
        <EssaySubmitButton
          color={'var(--blue)'}
          onClick={() => {
            event({ type: 'PREVIOUS' })
          }}
        >
          Go Back
        </EssaySubmitButton>
      ) : (
        <EssaySubmitButton
          color={'var(--red)'}
          onClick={() => setSubmitToggle(false)}
        >
          No
        </EssaySubmitButton>
      )}
      {submitToggle && <EssaySubmitCheck>Are you Sure?</EssaySubmitCheck>}
      {state.context.textToSubmit && (
        <>
          {!submitToggle ? (
            <EssaySubmitButton
              color={'var(--blue)'}
              submitFinal={submitToggle}
              onClick={() => setSubmitToggle(true)}
            >
              Resubmit
            </EssaySubmitButton>
          ) : (
            <EssaySubmitButton
              color={called ? 'var(--grey)' : 'var(--blue)'}
              submitFinal={submitToggle}
              onClick={() => {
                resubmitFinalDraft()
              }}
            >
              {called ? 'Submiting' : 'Yes'}
            </EssaySubmitButton>
          )}
        </>
      )}
    </>
  )
}
