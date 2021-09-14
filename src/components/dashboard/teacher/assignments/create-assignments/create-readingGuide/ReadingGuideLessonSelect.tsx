import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import { useQuery } from '@apollo/client'
import { findLessonsByUnit, findLessonsByUnitVariables } from '../../../../../../schemaTypes'
import { FIND_LESSONS_BY_UNIT_QUERY } from '../create-essay/EssayLessonSelect'
import {
	LessonInformationSelectContainer,
	SelectorContainer,
	SelectorTitle,
	ItemSelectorContainer,
	SelectableItem,
	SelectButtonContainer,
	SelectButton,
} from '../state-and-styles/createAssignmentsStyles'

export type ReadingGuideLessonSelectProps = {
	courseId: string
}

export const ReadingGuideLessonSelect = ({ courseId }: ReadingGuideLessonSelectProps) => {
	const [state, event] = useCreateAssignmentContextPovider()

	const { loading, data } = useQuery<findLessonsByUnit, findLessonsByUnitVariables>(
		FIND_LESSONS_BY_UNIT_QUERY,
		{
			variables: {
				input: {
					unitId: state.context.readingGuide.unit,
					courseId,
				},
			},
			onError: (error) => console.error(error),
		}
	)
	if (loading) return <div>Loading </div>
	console.log(
		data?.findLessonsByUnit.lessons.filter((lesson) => lesson.lessonType === 'INTRODUCTORY')
	)
	return (
		<LessonInformationSelectContainer>
			<SelectorContainer>
				<SelectorTitle>Select Lesson</SelectorTitle>
				<ItemSelectorContainer>
					{data?.findLessonsByUnit.lessons
						.filter((lesson) => lesson.lessonType === 'INTRODUCTORY')
						.map((lesson) => (
							<SelectableItem
								key={lesson._id!}
								onClick={() => {
									event({ type: 'SET_LESSON', payload: lesson._id! })
									// event({
									//   type: 'SET_ASSIGNED_DATE',
									//   payload: lesson.assignedDate!,
									// })
									event({ type: 'READING_GUIDE_INFO' })
								}}>
								{lesson.lessonName}
							</SelectableItem>
						))}
				</ItemSelectorContainer>
			</SelectorContainer>
			<SelectButtonContainer>
				<SelectButton onClick={() => event({ type: 'READING_GUIDE_UNIT' })}>
					Choose Different Unit
				</SelectButton>
			</SelectButtonContainer>
		</LessonInformationSelectContainer>
	)
}
