import React, { FC, useState, useEffect } from 'react'
import { findAssignmentById_findAssignmentById_assignment_Essay } from '../../../../../../../schemaTypes'
import { usePaperBasedContextProvider } from '../PaperBasedContext'

export type GradeEssayProps = {
  essay: findAssignmentById_findAssignmentById_assignment_Essay
}

export const GradeEssay: FC<GradeEssayProps> = ({ essay }) => {
  const [state, event] = usePaperBasedContextProvider()
  const [loadingDraft, setloadingDraft] = useState(false)
  useEffect(() => {
    const lastSubmittedDraft =
      essay.finalDraft?.submittedFinalDraft[
        essay.finalDraft.submittedFinalDraft.length - 1
      ]

    event({
      type: 'SET_INTITIAL_DRAFT',
      payload: {
        _id: essay._id!,
        draftNumber: lastSubmittedDraft?.draftNumber!,
        gradingDraft: lastSubmittedDraft?.gradingDraft,
        rubricEntries: lastSubmittedDraft?.rubricEntries!,
        score: lastSubmittedDraft?.score!,
        additionalComments: lastSubmittedDraft?.additionalComments,
      },
    })
    event({
      type: 'SET_DRAFT_SELECTOR',
      payload: essay.finalDraft?.submittedFinalDraft.length! - 1,
    })
    setloadingDraft(true)
  }, [essay, event])

  return (
    <>
      {loadingDraft && (
        <>
          <div></div>
        </>
      )}
    </>
  )
}
