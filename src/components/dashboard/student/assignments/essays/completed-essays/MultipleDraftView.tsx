import React, { FC, useState } from 'react'
import { findCompletedEssayById_findEssayById_essay } from '../../../../../../schemaTypes'
import { CompletedEssayViewer } from './CompletedEssayViewer'

export type MultipleDraftViewProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export const MultipleDraftView: FC<MultipleDraftViewProps> = ({ essay }) => {
  const [draftSelector, setDraftSelector] = useState(
    essay.finalDraft?.submittedFinalDraft.length! - 1
  )
  const currentDraft = essay.finalDraft?.submittedFinalDraft[draftSelector]

  return (
    <>
      <div>
        <span
          onClick={() => {
            if (draftSelector > 0) {
              setDraftSelector((c) => c - 1)
            }
          }}
        >
          &lt;
        </span>{' '}
        <span>Draft {draftSelector + 1}</span>
        <span
          onClick={() => {
            if (
              draftSelector <
              essay.finalDraft?.submittedFinalDraft.length! - 1
            ) {
              setDraftSelector((c) => c + 1)
            }
          }}
        >
          &gt;
        </span>
      </div>
      <CompletedEssayViewer draft={currentDraft!.draft} />
      <>
        <span>Score: </span>
        <span>{currentDraft!.score}</span>
      </>
      <>
        {currentDraft!.rubricEntries.map((entry, i: number) => (
          <div key={i}>{entry.entry}</div>
        ))}
      </>
      <>
        {currentDraft!.additionalComments!.map((comment, i: number) => (
          <div key={i}>{comment}</div>
        ))}
      </>
    </>
  )
}
