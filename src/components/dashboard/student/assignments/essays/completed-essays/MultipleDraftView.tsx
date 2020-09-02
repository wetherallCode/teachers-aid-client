import React, { FC, useState } from 'react'
import {
  findCompletedEssayById_findEssayById_essay,
  SubmittedFinalDraftsInput,
} from '../../../../../../schemaTypes'
import { CompletedEssayViewer } from './CompletedEssayViewer'
import {
  DraftSelectorContainer,
  DraftSelectorBack,
  DraftSelectorDraftNumber,
  DraftSelectorNext,
  CompletedEssayContainer,
  ScoreSheet,
  ScoreSheetScore,
  ScoreSheetRubricComments,
  ScoreSheetRubricCommentsTitle,
  ScoreSheetAdditionalComments,
} from './state/completedEssayStyles'
import { EssayToRedo } from './EssayToRedo'
import { useCompletedEssayContextProvider } from './state/CompletedEssayContext'
import { RedoEssayEditor } from './RedoEssayEditor'
import { EssaySheet } from '../assigned-essays/state-and-styles/assignedEssayStyles'

export type MultipleDraftViewProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export const MultipleDraftView: FC<MultipleDraftViewProps> = ({ essay }) => {
  const [state, event] = useCompletedEssayContextProvider()
  const [draftSelector, setDraftSelector] = useState(
    essay.finalDraft?.submittedFinalDraft.length! - 1
  )
  const currentDraft = essay.finalDraft?.submittedFinalDraft[draftSelector]

  const submittedFinalDraft: SubmittedFinalDraftsInput = {
    draftNumber: state.context.draftNumber + 1,
    draft: state.context.draftToUpdate,
    gradingDraft: state.context.draftToUpdate,
    rubricEntries: [],
    additionalComments: [],
    score: 0,
    graded: false,
  }

  return (
    <>
      <DraftSelectorContainer>
        <DraftSelectorBack>
          <div
            onClick={() => {
              if (draftSelector > 0) {
                setDraftSelector((c) => c - 1)
              }
            }}
          >
            &lt;
          </div>
        </DraftSelectorBack>
        <DraftSelectorDraftNumber>
          <div> Draft {draftSelector + 1}</div>
        </DraftSelectorDraftNumber>
        <DraftSelectorNext>
          <div
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
          </div>
        </DraftSelectorNext>
      </DraftSelectorContainer>

      <CompletedEssayContainer>
        <CompletedEssayViewer draft={currentDraft!.draft} />
        {state.matches('redoEssay') ? (
          <EssaySheet>
            <RedoEssayEditor essay={essay} />
          </EssaySheet>
        ) : (
          <ScoreSheet>
            <ScoreSheetScore>
              <div>
                <span>Score: </span>
                <span>{currentDraft!.score}</span>
              </div>
            </ScoreSheetScore>
            <ScoreSheetRubricComments>
              <ScoreSheetRubricCommentsTitle>
                Rubric Comments
              </ScoreSheetRubricCommentsTitle>
              <div>
                <ul>
                  {currentDraft!.rubricEntries.map((entry, i: number) => (
                    <li key={i}>{entry.entry}</li>
                  ))}
                </ul>
              </div>
            </ScoreSheetRubricComments>
            <ScoreSheetAdditionalComments>
              <ScoreSheetRubricCommentsTitle>
                Additional Comments
              </ScoreSheetRubricCommentsTitle>
              <div>
                <ul>
                  {currentDraft!.additionalComments!.map(
                    (comment, i: number) => (
                      <li key={i}>{comment}</li>
                    )
                  )}
                </ul>
              </div>
            </ScoreSheetAdditionalComments>
          </ScoreSheet>
        )}
      </CompletedEssayContainer>
    </>
  )
}
