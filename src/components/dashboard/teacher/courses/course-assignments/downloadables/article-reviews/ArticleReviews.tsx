import { useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { CSVLink } from 'react-csv'
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
import { ArticleReviewRows } from './ArticleReviewRows'

export type ArticleReviewsProps = {}

export const ArticleReviews: FC<ArticleReviewsProps> = () => {
  const { course } = useParams()
  const me: me_me_Teacher = useUserContextProvider()
  const [currentMarkingPeriod] = useMarkingPeriodContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriod, setMarkingPeriod] = useState(
    currentMarkingPeriod.context.currentMarkingPeriod
  )
  const [dateFilter, setDateFilter] = useState('')

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
    onCompleted: (data) =>
      console.log(data.findArticleReviewsByCourse.articleReviews),
    onError: (error) => console.error(error),
  })

  const assignedDateList = data?.findArticleReviewsByCourse.articleReviews
    .map((review) => review.assignedDate)
    .reduce(
      (accum: string[], cValue) =>
        accum.includes(cValue) ? [...accum] : [...accum, cValue],
      []
    )

  const articleReviews = data?.findArticleReviewsByCourse.articleReviews.filter(
    (review) => review.assignedDate === dateFilter
  )!

  if (loading) return <div>Loading </div>

  return (
    <>
      <div>Article Reviews</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') setMarkingPeriod(e.target.value)
        }}
      >
        {/* <option value='none'>Select a Marking Period</option> */}
        {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
          <option key={mp} value={mp}>
            {mp}
          </option>
        ))}
      </select>
      <div>Assigned Date</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') setDateFilter(e.target.value)
        }}
      >
        <option value={'none'}>Select Date</option>
        {assignedDateList?.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      {!createCSVToggle && assignmentList.length > 0 && (
        <button
          style={{
            backgroundColor: 'var(--blue)',
            color: 'var(--white)',
            fontSize: '130%',
          }}
          onClick={() => setCreateCSVToggle(true)}
        >
          Load Import Grade Document
        </button>
      )}
      {createCSVToggle && assignmentList.length > 0 && (
        <CSVLink
          data={assignmentList}
          headers={headers}
          filename={dateFilter! + '_' + courseName.name}
          style={{
            backgroundColor: 'var(--red)',
            color: 'var(--white)',
            fontSize: '140%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
          }}
          target='_blank'
          onClick={() => {
            setCreateCSVToggle(false)
            setAssignmentList([])
          }}
        >
          Download
        </CSVLink>
      )}
      {articleReviews.length > 0 &&
        articleReviews.map((review) => (
          <ArticleReviewRows
            key={review._id}
            articleReview={review}
            setAssignmentList={setAssignmentList}
            createCSVToggle={createCSVToggle}
          />
        ))}
    </>
  )
}
