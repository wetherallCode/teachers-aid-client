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
    // variables: {
    //   input: { _id, submittedFinalDraft, late: isLate, paperBased: false },
    // },
    onCompleted: () => navigate('/dashboard/assignments'),
    refetchQueries: ['findEssaysToComplete', 'findEssayById'],
  })

  // function handleLate() {
  //   const submittedDate: string = new Date().toLocaleString().substring(0, 9)
  //   const submittedTime: string = new Date().toLocaleString().substring(10)

  //   let isLate: boolean = false

  //   if (submittedDate > essay.dueDate) {
  //     isLate = true
  //   }
  //   if (essay.dueDate === submittedDate && essay.dueTime < submittedTime) {
  //     isLate = true
  //   }
  //   return isLate
  // }
  // const lateness = handleLate()

  return (
    <button
      onClick={() =>
        submitFinalDraft({
          variables: {
            input: {
              _id,
              submittedFinalDraft,
              late: true, //server will change based on time submitted
              paperBased: false,
            },
          },
        })
      }
    >
      Submit
    </button>
  )
}
