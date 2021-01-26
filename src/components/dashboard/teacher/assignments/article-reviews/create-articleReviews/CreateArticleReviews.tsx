import { gql, useMutation } from '@apollo/client'
import React, { FC } from 'react'
import { useEffect } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import {
	createArticleReviews,
	createArticleReviewsVariables,
	MarkingPeriodEnum,
	me_me_Teacher,
	me_me_Teacher_teachesCourses,
	TimeOfDay,
} from '../../../../../../schemaTypes'
import { dateConverter } from '../../../../../../utils'

import { useArticleReviewContextProvider } from '../state-styles/ArticleReviewContext'

export type CreateArticleReviewsProps = {}

export const CREATE_ARTICLE_REVIEWS_MUTATION = gql`
	mutation createArticleReviews($input: CreateArticleReviewsInput!) {
		createArticleReviews(input: $input) {
			articleReviews {
				_id
			}
		}
	}
`

export const CreateArticleReviews: FC<CreateArticleReviewsProps> = () => {
	const [state, event] = useArticleReviewContextProvider()
	const me: me_me_Teacher = useUserContextProvider()
	const { markingPeriodEnum, timeOfDayEnum } = useEnumContextProvider()

	const courses = me.teachesCourses
		.filter((course) => course.name !== 'Cohort Class')
		.map((course) => course._id!)

	const fakeCourse = me.teachesCourses
		.filter((course) => course.name === 'Cohort Class')
		.map((course) => course._id!)

	useEffect(() => {
		event({ type: 'SET_ASSIGNER_ID', payload: me._id! })
		event({
			type: 'SET_ASSIGNED_COURSE_ID',
			payload: courses,
		})
	}, [me])

	const [createArticleReviews] = useMutation<createArticleReviews, createArticleReviewsVariables>(
		CREATE_ARTICLE_REVIEWS_MUTATION,
		{
			variables: { input: state.context.articleReviewToCreate },
			onCompleted: (data) => console.log(data),
			refetchQueries: [],
		}
	)

	const readyToCreate =
		state.context.articleReviewToCreate.assignedDate !== '' &&
		state.context.articleReviewToCreate.dueDate !== '' &&
		state.context.articleReviewToCreate.assignedCourseId
	return (
		<>
			<div onClick={() => event({ type: 'PREVIOUS' })}>Back</div>
			<div>Create Article Reviews</div>
			<div>Assigned Date: </div>
			<input
				type='date'
				onChange={(e: any) =>
					event({
						type: 'SET_ASSIGNED_DATE',
						payload: dateConverter(e.target.value),
					})
				}
			/>
			<div>Due Date: </div>
			<input
				type='date'
				onChange={(e: any) =>
					event({
						type: 'SET_DUE_DATE',
						payload: dateConverter(e.target.value),
					})
				}
			/>
			<span>Time: </span>
			<select
				value={state.context.articleReviewToCreate.dueTime}
				onChange={(e: any) => {
					event({ type: 'SET_DUE_TIME', payload: e.target.value })
				}}>
				{timeOfDayEnum.map((time: TimeOfDay) => (
					<option key={time!} value={time!}>
						{time === 'BEFORE_SCHOOL'
							? 'Before School'
							: time === 'BEFORE_CLASS'
							? 'Before Class'
							: time === 'AFTER_CLASS'
							? 'After Class'
							: 'After School'}
					</option>
				))}
			</select>
			<div>Marking Period: </div>
			<select onChange={(e: any) => event({ type: 'SET_MARKING_PERIOD', payload: e.target.value })}>
				{markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
					<option key={mp} value={mp}>
						{mp}
					</option>
				))}
			</select>
			{readyToCreate && <button onClick={() => createArticleReviews()}>Create</button>}
		</>
	)
}
