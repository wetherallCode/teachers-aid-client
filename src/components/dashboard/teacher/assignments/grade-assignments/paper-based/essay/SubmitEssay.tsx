import React, { FC } from 'react'
import { SUBMIT_FINAL_DRAFT_MUTATION } from '../../../../../student/assignments/essays/assigned-essays/SubmitEssay'
import {
  submitEssayFinalDraft,
  submitEssayFinalDraftVariables,
  SubmittedFinalDraftsInput,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resubmitEssayFinalDraft,
  resubmitEssayFinalDraftVariables,
  findAssignmentById_findAssignmentById_assignment_Essay,
} from '../../../../../../../schemaTypes'
import { useMutation } from '@apollo/client'
import { usePaperBasedContextProvider } from '../state/PaperBasedContext'
import { RESUBMIT_ESSAY_FINAL_DRAFT_MUTATION } from '../../../../../student/assignments/essays/completed-essays/SubmitRedoneEssay'
import { useNavigate, Navigate } from 'react-router'

export type SubmitEssayProps = {
  essay: findAssignmentById_findAssignmentById_assignment_Essay
}

export const SubmitEssay: FC<SubmitEssayProps> = ({ essay }) => {
  const [state] = usePaperBasedContextProvider()

  const navigate = useNavigate()
  const paperBasedValue = [
    {
      type: 'paragraph',
      children: [{ text: 'PaperBased' }],
    },
  ]

  const submittedFinalDraft: SubmittedFinalDraftsInput = {
    draftNumber: 0, //Because this component will always be the first draft
    draft: JSON.stringify(paperBasedValue),
    gradingDraft: JSON.stringify(paperBasedValue),
    rubricEntries: [],
    additionalComments: [],
    score: 0,
    graded: false,
  }

  const currentDraftNumber =
    essay.finalDraft?.submittedFinalDraft[
      essay.finalDraft.submittedFinalDraft.length - 1
    ].draftNumber! + 1

  const resubmittedFinalDraft: SubmittedFinalDraftsInput = {
    draftNumber: currentDraftNumber, //Because this component will always be the first draft
    draft: JSON.stringify(paperBasedValue),
    gradingDraft: JSON.stringify(paperBasedValue),
    rubricEntries: [],
    additionalComments: [],
    score: 0,
    graded: false,
  }

  const [submitPaperBasedEssay] = useMutation<
    submitEssayFinalDraft,
    submitEssayFinalDraftVariables
  >(SUBMIT_FINAL_DRAFT_MUTATION, {
    variables: {
      input: {
        _id: essay._id!,
        late: state.context.isLate,
        submittedFinalDraft: submittedFinalDraft,
        paperBased: true,
      },
    },
    onCompleted: () => navigate(`/dashboard/assignments/grade/${essay._id}`),
    refetchQueries: ['findAssignmentById', 'findEssayToGradeById'],
  })

  const [resubmitEssayFinalDraft] = useMutation<
    resubmitEssayFinalDraft,
    resubmitEssayFinalDraftVariables
  >(RESUBMIT_ESSAY_FINAL_DRAFT_MUTATION, {
    variables: {
      input: {
        essayId: state.context.assignmentId,
        submittedFinalDraft: resubmittedFinalDraft,
      },
    },
    onCompleted: () => navigate(`/dashboard/assignments/grade/${essay._id}`),
    refetchQueries: ['findAssignmentById', 'findEssayToGradeById'],
  })

  const isGraded =
    essay.finalDraft?.submittedFinalDraft[
      essay.finalDraft.submittedFinalDraft.length - 1
    ].graded === false

  return (
    <>
      {essay.finalDraft ? (
        <>
          {!isGraded ? (
            <button
              onClick={() => {
                resubmitEssayFinalDraft()
              }}
            >
              Resubmission
            </button>
          ) : (
            <Navigate to={`/dashboard/assignments/grade/${essay._id}`} />
          )}
        </>
      ) : (
        <button
          onClick={() => {
            submitPaperBasedEssay()
          }}
        >
          Grade
        </button>
      )}
    </>
  )
}
