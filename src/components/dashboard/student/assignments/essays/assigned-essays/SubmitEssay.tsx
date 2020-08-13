import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {
  submitEssayFinalDraft,
  submitEssayFinalDraftVariables,
  SubmittedFinalDraftsInput,
  findEssayById_findEssayById_essay,
} from '../../../../../../schemaTypes'

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

  return <button onClick={() => submitFinalDraft()}>Submit</button>
}
