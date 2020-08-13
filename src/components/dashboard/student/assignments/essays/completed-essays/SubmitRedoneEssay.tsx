import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {
  SubmittedFinalDraftsInput,
  resubmitEssayFinalDraft,
  resubmitEssayFinalDraftVariables,
} from '../../../../../../schemaTypes'

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
  const navigate = useNavigate()

  const [resubmitFinalDraft] = useMutation<
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
    <button
      onClick={() => {
        resubmitFinalDraft()
      }}
    >
      Resubmit
    </button>
  )
}
