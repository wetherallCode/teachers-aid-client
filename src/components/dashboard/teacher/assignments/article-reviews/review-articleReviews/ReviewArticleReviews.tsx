import React, { FC, useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { MarkingPeriodEnum, me_me_Teacher } from '../../../../../../schemaTypes'
import { sortByLetter } from '../../../../../../utils'
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
  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const [mp, setMp] = useState(markingPeriodState.context.currentMarkingPeriod)
  const courses = me.teachesCourses.filter(
    (course) => course.name !== 'Cohort Class'
  )
  const fakeCourse = me.teachesCourses.filter(
    (course) => course.name === 'Cohort Class'
  )

  return (
    <ReviewerContainer>
      <ReviewerCourseSelectContainer>
        <ReviewerCourseSelect>
          <div>Select Course</div>
          {courses.sort(sortByLetter).map((course) => {
            return (
              <div
                key={course._id!}
                style={{}}
                onClick={() => {
                  event({ type: 'SET_COURSE_TO_REVIEW', payload: course._id! })
                }}
              >
                {course.name}
              </div>
            )
          })}
        </ReviewerCourseSelect>
        <ReviewerCourseSelectBack>
          <div onClick={() => event({ type: 'IDLE' })}>Back</div>
          <select
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
          </select>
        </ReviewerCourseSelectBack>
      </ReviewerCourseSelectContainer>
      {state.context.courseToReview ? (
        <ReviewDisplay mp={mp} />
      ) : (
        <NoCourseDisplay>
          <div>Select a Course to Review</div>
        </NoCourseDisplay>
      )}
    </ReviewerContainer>
  )
}
