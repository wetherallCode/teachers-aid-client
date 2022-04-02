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
  EssaySubmitCheck,
} from './state-and-styles/assignedEssayStyles'
import { Modal } from '../../../../../../animations'
import { useStudentEssayContextProvider } from './state-and-styles/StudentEssayContext'
import { responsibilityPointConverter } from '../../../../../../utils'

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
  // essay: findEssayById_findEssayById_essay
  response: boolean
  grade: number
}

export const SubmitEssay = ({
  _id,
  submittedFinalDraft,
  response,
  grade,
}: SubmitEssayFinalDraftInput) => {
  const navigate = useNavigate()
  const [, event] = useStudentEssayContextProvider()
  const [submitToggle, setSubmitToggle] = useState(false)
  const [submitFinalDraft, { called }] = useMutation<
    submitEssayFinalDraft,
    submitEssayFinalDraftVariables
  >(SUBMIT_FINAL_DRAFT_MUTATION, {
    onCompleted: () => {
      console.log(new Date().toLocaleString())
      navigate('/dashboard/assignments')
    },
    refetchQueries: ['findEssaysToComplete', 'findEssayById'],
  })

  const handleSubmit = () => {
    if (!called) {
      submitFinalDraft({
        variables: {
          input: {
            _id,
            submittedFinalDraft,
            submitTime: new Date().toLocaleString(),
            late: true, //server will change based on time submitted
            paperBased: false,
            responsibilityPoints: responsibilityPointConverter(grade, 10),
          },
        },
      })
    }
  }

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
          color={'var(--red)'}
          onClick={() => setSubmitToggle(false)}
        >
          No
        </EssaySubmitButton>
      )}
      {submitToggle && <EssaySubmitCheck>Are you Sure?</EssaySubmitCheck>}
      {response && (
        <>
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
              color={called ? 'var(--grey)' : 'var(--blue)'}
              submitFinal={submitToggle}
              onClick={handleSubmit}
            >
              {called ? 'Submiting' : 'Yes'}
            </EssaySubmitButton>
          )}
        </>
      )}
    </>
  )
}
