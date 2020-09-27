import React, { FC } from 'react'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { me_me_Teacher } from '../../../../../../schemaTypes'
import { useArticleReviewContextProvider } from '../state-styles/ArticleReviewContext'
import { ReviewDisplay } from './ReviewDisplay'

export type ReviewArticleReviewsProps = {}

export const ReviewArticleReviews: FC<ReviewArticleReviewsProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const [state, event] = useArticleReviewContextProvider()
  const courses = me.teachesCourses.filter(
    (course) => course.name !== 'Cohort Class'
  )
  const fakeCourse = me.teachesCourses.filter(
    (course) => course.name === 'Cohort Class'
  )

  return (
    <>
      <div>Select A Course</div>
      <div>
        {courses.map((course) => (
          <div
            key={course._id!}
            onClick={() => {
              console.log(course._id!)
              event({ type: 'SET_COURSE_TO_REVIEW', payload: course._id! })
            }}
          >
            {course.name}
          </div>
        ))}
      </div>
      {state.context.courseToReview && <ReviewDisplay />}
    </>
  )
}
