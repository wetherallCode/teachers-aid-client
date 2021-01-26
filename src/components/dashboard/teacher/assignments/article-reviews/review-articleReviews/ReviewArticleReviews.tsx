import React, { FC } from 'react'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { me_me_Teacher } from '../../../../../../schemaTypes'
import { useArticleReviewContextProvider } from '../state-styles/ArticleReviewContext'
import { ReviewerContainer, ReviewerCourseSelect } from '../state-styles/articleReviewStyles'
import { ReviewDisplay } from './ReviewDisplay'

export type ReviewArticleReviewsProps = {}

export const ReviewArticleReviews: FC<ReviewArticleReviewsProps> = () => {
	const me: me_me_Teacher = useUserContextProvider()
	const [state, event] = useArticleReviewContextProvider()
	const courses = me.teachesCourses.filter((course) => course.name !== 'Cohort Class')
	const fakeCourse = me.teachesCourses.filter((course) => course.name === 'Cohort Class')

	return (
		<ReviewerContainer>
			<ReviewerCourseSelect>
				<div>Select Course</div>
				{courses.map((course) => {
					return (
						<div
							key={course._id!}
							style={{}}
							onClick={() => {
								event({ type: 'SET_COURSE_TO_REVIEW', payload: course._id! })
							}}>
							{course.name}
						</div>
					)
				})}
			</ReviewerCourseSelect>
			{state.context.courseToReview && <ReviewDisplay />}
		</ReviewerContainer>
	)
}
