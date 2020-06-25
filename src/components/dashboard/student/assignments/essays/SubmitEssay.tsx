import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { submittedFinalDraftType } from '../../../../editor/StudentEssayEditor'
import {
  submitEssayFinalDraft,
  submitEssayFinalDraftVariables,
} from '../../../../../schemaTypes'

export const SUBMIT_FINAL_DRAFT_MUTATION = gql`
  mutation submitEssayFinalDraft($input: SubmitEssayFinalDraftInput!) {
    submitEssayFinalDraft(input: $input) {
      essay {
        _id
      }
    }
  }
`

export type SubmitEssayFinalDraftInput = {
  _id: string
  submittedFinalDraft: submittedFinalDraftType
  isLate: boolean
}

export const SubmitEssay: FC<SubmitEssayFinalDraftInput> = ({
  _id,
  submittedFinalDraft,
  isLate,
}) => {
  const navigate = useNavigate()

  const [submitFinalDraft] = useMutation<
    submitEssayFinalDraft,
    submitEssayFinalDraftVariables
  >(SUBMIT_FINAL_DRAFT_MUTATION, {
    variables: { input: { _id, submittedFinalDraft, late: isLate } },
    refetchQueries: ['findEssaysToComplete'],
    onCompleted: () => navigate('/dashboard/assignments'),
  })
  return <button onClick={() => submitFinalDraft()}>Submit</button>
}
