import React, { FC, useEffect } from 'react'
import { AssignedEssaySelect } from './essays/assigned-essays/AssignedEssaySelect'
import { CompletedEssaySelect } from './essays/completed-essays/CompletedEssaySelect'
import { AssignedReadingGuideSelect } from './readingGuides/AssignedReadingGuideSelect'
import {
	AssignmentsToCompleteContainer,
	AssignmentsTypeSelectorPanel,
	AssignmentsTypeStyle,
	AssignmentsTypeSelectorHeader,
	AssignmentTypeContainer,
} from './state-n-styles/assignmentsStyles'
import { useStudentAssignmentContextProvider } from './state-n-styles/StudentAssignmentContext'
import { ArticleReviewSelect } from './articleReviews/ArticleReviewSelect'
import { MarkingPeriodSelector } from './MarkingPeriodSelector'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import { MarkingPeriodEnum } from '../../../../schemaTypes'

export type StudentAssignmentsProps = {}

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
	const [state, event] = useStudentAssignmentContextProvider()
	const [markingPeriodState] = useMarkingPeriodContextProvider()
	// const { currentMarkingPeriod } = markingPeriodState.context
	// const fakeCurrentMarkingPeriod = MarkingPeriodEnum.SECOND
	// useEffect(() => {
	//   event({ type: 'SET_MARKING_PERIOD', payload: fakeCurrentMarkingPeriod })
	// }, [])
	console.log(state.value)
	return (
		<AssignmentsToCompleteContainer>
			<AssignmentsTypeSelectorPanel>
				<AssignmentsTypeSelectorHeader>Assignments</AssignmentsTypeSelectorHeader>
				<AssignmentsTypeStyle
					selected={state.matches('essaysToComplete')}
					onClick={() => event({ type: 'ESSAYS_TO_COMPLETE' })}>
					Essays to Complete
				</AssignmentsTypeStyle>
				<AssignmentsTypeStyle
					selected={state.matches('completedEssays')}
					onClick={() => event({ type: 'COMPLETED_ESSAYS' })}>
					Completed Essays
				</AssignmentsTypeStyle>
				<AssignmentsTypeStyle
					selected={state.matches('readingGuidesToComplete')}
					onClick={() => event({ type: 'READING_GUIDES' })}>
					Reading Guides to Complete
				</AssignmentsTypeStyle>
				{/* <AssignmentsTypeStyle
          onClick={() => event({ type: 'ARTICLE_REVIEWS' })}
        >
          Article Reviews to Complete
        </AssignmentsTypeStyle> */}
			</AssignmentsTypeSelectorPanel>
			<AssignmentTypeContainer>
				{state.matches('essaysToComplete') && <AssignedEssaySelect />}
				{state.matches('completedEssays') && <CompletedEssaySelect />}
				{state.matches('readingGuidesToComplete') && <AssignedReadingGuideSelect />}
				{state.matches('articleReviewsToComplete') && <ArticleReviewSelect />}
				<MarkingPeriodSelector />
			</AssignmentTypeContainer>
		</AssignmentsToCompleteContainer>
	)
}
