import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../contexts/EnumContext'
import {
	MarkingPeriodContextProvider,
	useMarkingPeriodContextProvider,
} from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
	findAssignmentByStudentId,
	findAssignmentByStudentIdVariables,
	MarkingPeriodEnum,
} from '../../../../schemaTypes'
import { useStudentInformationContextProvider } from './state-n-styles/StudentInformationContext'
import {
	AssignmentInformationAssignmentSwitchContainer,
	AssignmentInformationContainer,
	AssignmentInformationContainerHeader,
	AssignmentInformationDisplayContainer,
	AssignmentInformationStyle,
	AssignmentSwitch,
	IndividualAssignmentDisplay,
} from './state-n-styles/studentInformationStyles'

export type AssignmentInformationProps = {
	studentId: string
	selectedMarkingPeriod: MarkingPeriodEnum
}

export const FIND_ASSINGMENT_INFORMATION_QUERY = gql`
	query findAssignmentByStudentId($input: FindAssignmentByStudentIdInput!) {
		findAssignmentByStudentId(input: $input) {
			assignments {
				_id
				assigned
				readings {
					readingSections
				}
				score {
					earnedPoints
					maxPoints
				}
				exempt
				dueDate
				dueTime
				markingPeriod
				... on Essay {
					finalDraft {
						returned
						submitted
						submittedFinalDraft {
							graded
						}
					}
				}
				... on ReadingGuide {
					readingGuideFinal {
						submitted
					}
				}
			}
			articleReviews {
				_id
				score {
					earnedPoints
					maxPoints
				}
				assignedDate
				exempt
				submitted
				markingPeriod
				dueDate
				dueTime
			}
		}
	}
`

export const AssignmentInformation = ({
	studentId,
	selectedMarkingPeriod,
}: AssignmentInformationProps) => {
	const [state, event] = useStudentInformationContextProvider()
	const { loading, data } = useQuery<findAssignmentByStudentId, findAssignmentByStudentIdVariables>(
		FIND_ASSINGMENT_INFORMATION_QUERY,
		{
			variables: {
				input: { studentId },
			},
			onCompleted: (data) => console.log(data),
			onError: (error) => console.error(error),
		}
	)

	const essays = data?.findAssignmentByStudentId.assignments.filter(
		(assignment) =>
			assignment.__typename === 'Essay' && assignment.markingPeriod === selectedMarkingPeriod
	)!
	const readingGuides = data?.findAssignmentByStudentId.assignments.filter(
		(assignment) =>
			assignment.__typename === 'ReadingGuide' && assignment.markingPeriod === selectedMarkingPeriod
	)!
	const articleReviews = data?.findAssignmentByStudentId.articleReviews.filter(
		(review) => review.markingPeriod === selectedMarkingPeriod
	)!

	if (loading) return <div>Loading </div>
	return (
		<AssignmentInformationContainer>
			<AssignmentInformationAssignmentSwitchContainer>
				<AssignmentSwitch
					selected={state.matches('information.assignments.essays')}
					onClick={() => event({ type: 'ESSAYS' })}>
					Essays
				</AssignmentSwitch>
				<AssignmentSwitch
					selected={state.matches('information.assignments.readingGuides')}
					onClick={() => event({ type: 'READING_GUIDES' })}>
					Reading Guides
				</AssignmentSwitch>
				<AssignmentSwitch
					selected={state.matches('information.assignments.articleReviews')}
					onClick={() => event({ type: 'ARTICLE_REVIEWS' })}>
					Article Reviews
				</AssignmentSwitch>
			</AssignmentInformationAssignmentSwitchContainer>

			<AssignmentInformationDisplayContainer>
				<AssignmentInformationContainerHeader>
					<div>Assignment Title</div>
					<div>Grade</div>
				</AssignmentInformationContainerHeader>

				{state.matches('information.assignments.essays') && (
					<AssignmentInformationStyle>
						{essays.map((essay, i: number) => (
							<IndividualAssignmentDisplay
								key={essay._id}
								everyOtherLine={i % 2 === 0}
								lastLine={essays.length - 1 === i}>
								<div>{essay.readings.readingSections}</div>
								{essay.__typename === 'Essay' && essay.finalDraft && essay.finalDraft.returned ? (
									<div>
										{essay.score.earnedPoints}/{essay.score.maxPoints}
									</div>
								) : essay.__typename === 'Essay' &&
								  essay.finalDraft &&
								  !essay.finalDraft.returned &&
								  essay.finalDraft.submittedFinalDraft.length > 1 ? (
									<div>
										{essay.score.earnedPoints}/{essay.score.maxPoints}
									</div>
								) : essay.__typename === 'Essay' &&
								  essay.finalDraft &&
								  !essay.finalDraft.returned ? (
									<div>Pending</div>
								) : essay.exempt ? (
									<div>Exempt</div>
								) : !essay.assigned ? (
									<div>Unassigned</div>
								) : Date.parse(new Date().toLocaleString()) <
								  Date.parse(`${essay.dueDate}, ${essay.dueTime}`) ? (
									<div>Due on {essay.dueDate}</div>
								) : (
									<div>Missing</div>
								)}
							</IndividualAssignmentDisplay>
						))}
					</AssignmentInformationStyle>
				)}
				{state.matches('information.assignments.readingGuides') && (
					<AssignmentInformationStyle>
						{readingGuides.map((guide, i: number) => (
							<IndividualAssignmentDisplay
								key={guide._id}
								everyOtherLine={i % 2 === 0}
								lastLine={readingGuides.length - 1 === i}>
								<div>{guide.readings.readingSections}</div>
								{guide.__typename === 'ReadingGuide' && guide.readingGuideFinal ? (
									<div>
										{guide.score.earnedPoints}/{guide.score.maxPoints}
									</div>
								) : guide.exempt ? (
									<div>Exempt</div>
								) : !guide.assigned ? (
									<div>Unassigned</div>
								) : Date.parse(new Date().toLocaleString()) <
								  Date.parse(`${guide.dueDate}, ${guide.dueTime}`) ? (
									<div>Due on {guide.dueDate}</div>
								) : (
									<div>Missing</div>
								)}
							</IndividualAssignmentDisplay>
						))}
					</AssignmentInformationStyle>
				)}
				{state.matches('information.assignments.articleReviews') && (
					<AssignmentInformationStyle>
						{articleReviews.map((review, i: number) => (
							<IndividualAssignmentDisplay
								key={review._id}
								everyOtherLine={i % 2 === 0}
								lastLine={articleReviews.length - 1 === i}>
								<div>{review.assignedDate}</div>
								{review.submitted ? (
									<div>
										{review.score.earnedPoints}/{review.score.maxPoints}
									</div>
								) : (
									<div>Missing</div>
								)}
							</IndividualAssignmentDisplay>
						))}
					</AssignmentInformationStyle>
				)}
			</AssignmentInformationDisplayContainer>
		</AssignmentInformationContainer>
	)
}
