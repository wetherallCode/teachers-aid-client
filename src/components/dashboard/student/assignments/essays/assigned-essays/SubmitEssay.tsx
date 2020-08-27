import React, { FC, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {
  submitEssayFinalDraft,
  submitEssayFinalDraftVariables,
  SubmittedFinalDraftsInput,
  findEssayById_findEssayById_essay,
} from '../../../../../../schemaTypes'
import {
  OrganizerControlButton,
  EssaySubmitButton,
  SubmitEssayModalContainer,
  SubmitEssayModalSubmitButton,
  SubmitEssayModal,
  SubmitEssayModalMessage,
} from './state-and-styles/assignedEssayStyles'
import { Modal } from '../../../../../../animations'
import { useStudentEssayContextProvider } from './state-and-styles/StudentEssayContext'

export const SUBMIT_FINAL_DRAFT_MUTATION = gql`
  mutation submitEssayFinalDraft($input: SubmitEssayFinalDraftInput!) {
    submitEssayFinalDraft(input: $input) {
      essay {
        _id
        assigned
        finalDraft {
          submittedFinalDraft {
            gradingDraft
            draft
          }
        }
      }
    }
  }
`

export type SubmitEssayFinalDraftInput = {
  _id: string
  submittedFinalDraft: SubmittedFinalDraftsInput
  essay: findEssayById_findEssayById_essay
}

export const SubmitEssay: FC<SubmitEssayFinalDraftInput> = ({
  _id,
  submittedFinalDraft,
  essay,
}) => {
  const navigate = useNavigate()
  const [, event] = useStudentEssayContextProvider()
  const [submitToggle, setSubmitToggle] = useState(false)
  const [submitFinalDraft] = useMutation<
    submitEssayFinalDraft,
    submitEssayFinalDraftVariables
  >(SUBMIT_FINAL_DRAFT_MUTATION, {
    variables: {
      input: {
        _id,
        submittedFinalDraft,
        late: true, //server will change based on time submitted
        paperBased: false,
      },
    },
    onCompleted: () => navigate('/dashboard/assignments'),
    refetchQueries: ['findEssaysToComplete', 'findEssayById'],
  })

  return (
    <>
      {!submitToggle ? (
        <EssaySubmitButton
          color={'var(--blue)'}
          submitFinal={submitToggle}
          onClick={() => {
            event({ type: 'PREVIOUS' })
            event({ type: 'NEXT' })
          }}
        >
          Go Back
        </EssaySubmitButton>
      ) : (
        <EssaySubmitButton
          color={'var(--blue)'}
          onClick={() => setSubmitToggle(false)}
        >
          Review Essay
        </EssaySubmitButton>
      )}
      {!submitToggle ? (
        <EssaySubmitButton
          color={'var(--blue)'}
          submitFinal={submitToggle}
          onClick={() => setSubmitToggle(true)}
        >
          Submit
        </EssaySubmitButton>
      ) : (
        <EssaySubmitButton
          color={'var(--red)'}
          submitFinal={submitToggle}
          onClick={() => submitFinalDraft()}
        >
          Are you sure?
        </EssaySubmitButton>
      )}
      {/* <SubmitEssayModal isToggled={isToggled} setIsToggled={setIsToggled}>
        <SubmitEssayModalContainer>
          <SubmitEssayModalMessage>
            Are you sure? once it's been submitted it's final.
          </SubmitEssayModalMessage>
          <SubmitEssayModalSubmitButton>Not Yet!</SubmitEssayModalSubmitButton>
          <SubmitEssayModalSubmitButton onClick={() => submitFinalDraft()}>
            Submit
          </SubmitEssayModalSubmitButton>
        </SubmitEssayModalContainer>
      </SubmitEssayModal> */}
    </>
  )
}
