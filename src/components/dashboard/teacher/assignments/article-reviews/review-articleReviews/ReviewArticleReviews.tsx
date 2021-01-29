import React, { FC, useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { useToggle } from '../../../../../../hooks'
import { MarkingPeriodEnum, me_me_Teacher } from '../../../../../../schemaTypes'
import { sortByLetter } from '../../../../../../utils'
import { CourseSelect } from '../../grade-assignments/state-n-styles/GradeEssayContainerStyles'
import { useArticleReviewContextProvider } from '../state-styles/ArticleReviewContext'
import {
  NoCourseDisplay,
  ReviewerContainer,
  ReviewerCourseSelect,
  ReviewerCourseSelectBack,
  ReviewerCourseSelectContainer,
} from '../state-styles/articleReviewStyles'
import { ReviewDisplay } from './ReviewDisplay'

export type ReviewArticleReviewsProps = {}

export const ReviewArticleReviews: FC<ReviewArticleReviewsProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const [state, event] = useArticleReviewContextProvider()
  // const { markingPeriodEnum } = useEnumContextProvider()
  // const [markingPeriodState] = useMarkingPeriodContextProvider()
  // const [mp, setMp] = useState(markingPeriodState.context.currentMarkingPeriod)

  const courses = me.teachesCourses.filter(
    (course) => course.name !== 'Cohort Class'
  )
  const fakeCourse = me.teachesCourses.filter(
    (course) => course.name === 'Cohort Class'
  )

  return (
    <ReviewerContainer>
      <ReviewerCourseSelectContainer>
        <CourseSelect>
          <div>Select Course</div>
          {courses.sort(sortByLetter).map((course) => {
            return (
              <div
                key={course._id!}
                style={
                  course._id === state.context.courseToReview
                    ? { textDecoration: 'underline' }
                    : { textDecoration: 'none' }
                }
                onClick={() => {
                  event({ type: 'SET_COURSE_TO_REVIEW', payload: course._id! })
                }}
              >
                {course.name}
              </div>
            )
          })}
        </CourseSelect>
        <ReviewerCourseSelectBack>
          <div onClick={() => event({ type: 'IDLE' })}>Back</div>
          <div>
            {/* <select
              value={mp}
              onChange={(e: any) => {
                setMp(e.target.value)
              }}
            >
              {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
                <option key={mp} value={mp}>
                  {mp}
                </option>
              ))}
            </select> */}
          </div>
        </ReviewerCourseSelectBack>
      </ReviewerCourseSelectContainer>
      {state.context.courseToReview ? (
        <ReviewDisplay />
      ) : (
        <NoCourseDisplay>
          <div>Select a Course to Review</div>
        </NoCourseDisplay>
      )}
    </ReviewerContainer>
  )
}
