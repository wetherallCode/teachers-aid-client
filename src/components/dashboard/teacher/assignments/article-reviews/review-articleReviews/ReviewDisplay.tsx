import { gql, useQuery } from '@apollo/client'
import React, { FC, Fragment, useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import {
	findArticleReviewsByCourse,
	findArticleReviewsByCourseVariables,
	MarkingPeriodEnum,
	me_me_Teacher,
} from '../../../../../../schemaTypes'
import { useArticleReviewContextProvider } from '../state-styles/ArticleReviewContext'
import {
	ReturnedStatus,
	ReturnReview,
	ReviewList,
	ReviewName,
} from '../state-styles/articleReviewStyles'
import { ArticleReviewReturn } from './ArticleReviewReturn'

export type ReviewDisplayProps = {}
export const FIND_ARTICLE_REVIEWS_BY_COURSE_QUERY = gql`
	query findArticleReviewsByCourse($input: FindArticleReviewsByCourseInput!) {
		findArticleReviewsByCourse(input: $input) {
			articleReviews {
				_id
				score {
					earnedPoints
				}
				hasOwner {
					firstName
					lastName
					schoolId
					_id
				}
				assignedDate
				dueDate
				completed
				late
				returned
			}
		}
	}
`
export const ReviewDisplay: FC<ReviewDisplayProps> = () => {
	const [state, event] = useArticleReviewContextProvider()
	const [markingPeriodState] = useMarkingPeriodContextProvider()
	const { markingPeriodEnum } = useEnumContextProvider()
	const [mp, setMp] = useState(markingPeriodState.context.currentMarkingPeriod)

	const { loading, data } = useQuery<
		findArticleReviewsByCourse,
		findArticleReviewsByCourseVariables
	>(FIND_ARTICLE_REVIEWS_BY_COURSE_QUERY, {
		variables: {
			input: {
				courseId: state.context.courseToReview,
				markingPeriod: mp,
			},
		},
		pollInterval: 10000,
		onCompleted: (data) => console.log(data),
		onError: (error) => console.error(error),
	})

	const assignedDateList = data?.findArticleReviewsByCourse.articleReviews
		.map((review) => review.assignedDate)
		.reduce(
			(accum: string[], cValue) => (accum.includes(cValue) ? [...accum] : [...accum, cValue]),
			[]
		)
	const dateToReview = data?.findArticleReviewsByCourse.articleReviews.filter(
		(review) => review.assignedDate === state.context.selectedDate
	)

	if (loading) return <div>Loading </div>
	return (
		<>
			<div>Find by Assigned Date</div>
			<select value={mp} onChange={(e: any) => setMp(e.target.value)}>
				{markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
					<option key={mp} value={mp}>
						{mp}
					</option>
				))}
			</select>
			<select
				onChange={(e: any) => {
					if (e !== 'none') {
						event({ type: 'SET_SELECTED_DATE', payload: e.target.value })
					}
				}}>
				<option value={'none'}>Select a Date</option>
				{assignedDateList?.map((date) => (
					<option key={date} value={date}>
						{date}
					</option>
				))}
			</select>
			{dateToReview?.map((reviews, i: number) => (
				<ReviewList
					key={reviews._id!}
					style={i % 2 ? { background: 'var(--grey' } : { background: 'var(--white)' }}>
					<ReviewName
						key={reviews._id!}
						style={reviews.returned ? { color: 'var(--red)' } : { color: 'var(--blue)' }}>
						{reviews.hasOwner.firstName}:{' '}
						{Number(reviews.score.earnedPoints) > 0 ? reviews.score.earnedPoints : 'Missing'}
						{reviews.late && Number(reviews.score.earnedPoints) > 0 && ' late'}
					</ReviewName>
					{!reviews.returned && reviews.completed && (
						<ArticleReviewReturn reviewId={reviews._id!} />
					)}
				</ReviewList>
			))}
		</>
	)
}
