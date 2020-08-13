import React, { FC, useEffect } from 'react'
import { useGradeEssayContextProvider } from './GradeEssayContext'
import { findEssayToGradeById_findEssayById_essay } from '../../../../../../../schemaTypes'

export type DraftSelectorProps = {
  essay: findEssayToGradeById_findEssayById_essay
}

export const DraftSelector: FC<DraftSelectorProps> = ({ essay }) => {
  const [state, event] = useGradeEssayContextProvider()

  useEffect(() => {
    const [currentDraft] = essay.finalDraft?.submittedFinalDraft.filter(
      (draft) => draft.draftNumber === state.context.draftSelector
    )

    event({
      type: 'SET_DRAFT',
      payload: {
        _id: essay._id!,
        draftNumber: currentDraft.draftNumber,
        gradingDraft: currentDraft.gradingDraft,
        rubricEntries: currentDraft.rubricEntries,
        score: currentDraft.score,
        additionalComments: currentDraft.additionalComments,
      },
    })
  }, [essay._id, essay.finalDraft, event, state.context.draftSelector])

  return (
    <>
      <div>
        <span
          onClick={() => {
            if (state.context.draftSelector > 0) {
              event({
                type: 'SET_DRAFT_SELECTOR',
                payload: state.context.draftSelector - 1,
              })
            }
          }}
        >
          &lt;
        </span>{' '}
        <span>Draft {state.context.draftToGrade.draftNumber + 1}</span>{' '}
        <span>{}</span>{' '}
        <span
          onClick={() => {
            if (
              state.context.draftSelector <
              essay.finalDraft?.submittedFinalDraft.length! - 1
            ) {
              event({
                type: 'SET_DRAFT_SELECTOR',
                payload: state.context.draftSelector + 1,
              })
            }
          }}
        >
          &gt;
        </span>
      </div>
    </>
  )
}
