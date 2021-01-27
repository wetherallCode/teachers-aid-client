import { gql, useQuery } from '@apollo/client'
import React, { FC, Fragment, useEffect, useState } from 'react'
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
  DatesToReviewContainer,
  DateToReview,
  ReturnedStatus,
  ReturnReview,
  ReviewList,
  ReviewListContainer,
  ReviewMainDisplay,
  ReviewName,
  Title,
  TitleContainer,
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
  const me: me_me_Teacher = useUserContextProvider()
  const [state, event] = useArticleReviewContextProvider()
  const [gradingNeededIndicator, setGradingNeededIndicator] = useState(false)
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [mp, setMp] = useState(
    markingPeriodState.context.currentMarkingPeriod || MarkingPeriodEnum.SECOND
  )

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
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  useEffect(() => {
    if (
      data?.findArticleReviewsByCourse.articleReviews
        .filter((article) => article.completed)
        .some((article) => !article.returned)
    ) {
      setGradingNeededIndicator(true)
    } else setGradingNeededIndicator(false)
  }, [data?.findArticleReviewsByCourse.articleReviews])

  const assignedDateList = data?.findArticleReviewsByCourse.articleReviews
    .map((review) => review.assignedDate)
    .reduce(
      (accum: string[], cValue) =>
        accum.includes(cValue) ? [...accum] : [...accum, cValue],
      []
    )
  const dateToReview = data?.findArticleReviewsByCourse.articleReviews.filter(
    (review) => {
      return review.assignedDate === state.context.selectedDate
    }
  )
  const reviewNeedsGrading = data?.findArticleReviewsByCourse.articleReviews
    .filter((review) => review.completed && !review.returned)
    .map((review) => review.assignedDate)
    .reduce(
      (accum: string[], cValue) =>
        accum.includes(cValue) ? [...accum] : [...accum, cValue],
      []
    )
  const [courseName] = me.teachesCourses
    .filter((courseName) => courseName._id === state.context.courseToReview)
    .map((course) => course.name)
  console.log(state.context.courseToReview)
  return (
    <ReviewMainDisplay>
      <TitleContainer>
        <Title needsGrading={gradingNeededIndicator}>
          {gradingNeededIndicator ? '*' : ' '}Article Reviews - {courseName}
        </Title>
      </TitleContainer>
      <DatesToReviewContainer>
        {assignedDateList?.map((date) => {
          console.log(reviewNeedsGrading?.includes(date))
          return (
            <DateToReview
              key={date}
              selected={state.context.selectedDate === date}
              needsGradingIndicator={reviewNeedsGrading?.includes(date)!}
              onClick={(e: any) =>
                event({ type: 'SET_SELECTED_DATE', payload: date })
              }
            >
              {date}
            </DateToReview>
          )
        })}
      </DatesToReviewContainer>
      <ReviewListContainer
        style={
          state.context.selectedDate
            ? { borderTop: ' 1px solid var(--blue)' }
            : { borderTop: 'none' }
        }
      >
        {dateToReview?.map((reviews, i: number) => (
          <ReviewList
            key={reviews._id!}
            style={
              i % 2
                ? { background: 'var(--grey' }
                : { background: 'var(--white)' }
            }
          >
            <ReviewName key={reviews._id!} returned={reviews.returned}>
              {reviews.hasOwner.firstName}:{' '}
              {Number(reviews.score.earnedPoints) > 0
                ? reviews.score.earnedPoints
                : 'Missing'}
              {reviews.late &&
                Number(reviews.score.earnedPoints) > 0 &&
                ' late'}
            </ReviewName>
            {!reviews.returned && reviews.completed && (
              <ArticleReviewReturn reviewId={reviews._id!} />
            )}
          </ReviewList>
        ))}
      </ReviewListContainer>
    </ReviewMainDisplay>
  )
}
