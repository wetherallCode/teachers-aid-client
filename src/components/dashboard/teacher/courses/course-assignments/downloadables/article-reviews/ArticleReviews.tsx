import { useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { useParams } from 'react-router'
import { useEnumContextProvider } from '../../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../../../contexts/UserContext'
import {
  findArticleReviewsByCourse,
  findArticleReviewsByCourseVariables,
  MarkingPeriodEnum,
  me_me_Teacher,
} from '../../../../../../../schemaTypes'
import { FIND_ARTICLE_REVIEWS_BY_COURSE_QUERY } from '../../../../assignments/article-reviews/review-articleReviews/ReviewDisplay'
import { useAssignmentManagerContextProvider } from '../../state-styles/AssignmentManagerContext'

export type ArticleReviewsProps = {}

export const ArticleReviews: FC<ArticleReviewsProps> = () => {
  const { course } = useParams()
  const me: me_me_Teacher = useUserContextProvider()
  const [currentMarkingPeriod] = useMarkingPeriodContextProvider()
  const { markingPeriodEnums } = useEnumContextProvider()
  const [markingPeriod, setMarkingPeriod] = useState(
    currentMarkingPeriod.context.currentMarkingPeriod
  )
  const [courseName] = me.teachesCourses.filter(
    (courseToFind) => courseToFind._id === course
  )
  const [assignmentList, setAssignmentList] = useState<any[]>([])
  const [createCSVToggle, setCreateCSVToggle] = useState(false)
  const headers = [
    { label: 'NAME', key: 'NAME' },
    { label: 'STUDENTID', key: 'STUDENTID' },
    { label: 'GRADE', key: 'GRADE' },
    { label: 'ABSENT', key: 'ABSENT' },
    { label: 'EXEMPT', key: 'EXEMPT' },
    { label: 'INCOMPLETE', key: 'INCOMPLETE' },
    { label: 'MISSING', key: 'MISSING' },
  ]
  const [state, event] = useAssignmentManagerContextProvider()
  const { loading, data } = useQuery<
    findArticleReviewsByCourse,
    findArticleReviewsByCourseVariables
  >(FIND_ARTICLE_REVIEWS_BY_COURSE_QUERY, {
    variables: {
      input: { courseId: course, markingPeriod },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>
  return (
    <>
      <div>Article Reviews</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') setMarkingPeriod(e.target.value)
        }}
      >
        <option value='none'>Select a Marking Period</option>
        {markingPeriodEnums.map((mp: MarkingPeriodEnum) => (
          <option key={mp} value={mp}>
            {mp}
          </option>
        ))}
      </select>
      <select></select>
    </>
  )
}
