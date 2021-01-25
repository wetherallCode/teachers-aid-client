import React, { FC, useEffect } from 'react'
import { useGradeEssayContextProvider } from './GradeEssayContext'
import { findEssayToGradeById_findEssayById_essay } from '../../../../../../../schemaTypes'
import { DraftSelectorLeft, DraftSelectorRight } from './essay-grader-styles/EssaysToGradeStyles'

export type DraftSelectorProps = {
	essay: findEssayToGradeById_findEssayById_essay
}

export const DraftSelector: FC<DraftSelectorProps> = ({ essay }) => {
	const [state, event] = useGradeEssayContextProvider()

	useEffect(() => {
		const [currentDraft] = essay.finalDraft?.submittedFinalDraft.filter(
			(draft) => draft.draftNumber === state.context.draftSelector
		) as any

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
			<DraftSelectorLeft
				onClick={() => {
					if (state.context.draftSelector > 0) {
						event({
							type: 'SET_DRAFT_SELECTOR',
							payload: state.context.draftSelector - 1,
						})
					} else {
						event({ type: 'TOGGLE_ORGANIZER', payload: true })
					}
				}}>
				<div> &lt;</div>
			</DraftSelectorLeft>{' '}
			<DraftSelectorRight
				onClick={() => {
					if (state.context.draftSelector === 0) {
						event({ type: 'TOGGLE_ORGANIZER', payload: false })
					}
					if (state.context.draftSelector < essay.finalDraft?.submittedFinalDraft.length! - 2) {
						event({
							type: 'SET_DRAFT_SELECTOR',
							payload: state.context.draftSelector + 1,
						})
					}
				}}>
				&gt;
			</DraftSelectorRight>
		</>
	)
}
