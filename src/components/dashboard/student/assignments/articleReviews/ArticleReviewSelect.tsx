import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  findArticleReviewsByStudent,
  findArticleReviewsByStudentVariables,
  me_me_Student,
} from '../../../../../schemaTypes'
import {
  AssignmentTypeTitle,
  AssignmentTypeContentContainer,
  CompletionMessage,
  AssignmentLink,
} from '../assignmentsStyles'

export type ArticleReviewSelectProps = {}
export const ARTICE_REVIEWS_TO_COMPLETE_QUERY = gql`
  query findArticleReviewsByStudent($input: FindArticleReviewsByStudentInput!) {
    findArticleReviewsByStudent(input: $input) {
      articleReviews {
        _id
        assignedDate
        paperBased
        markingPeriod
      }
    }
  }
`
export const ArticleReviewSelect: FC<ArticleReviewSelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const { loading, data } = useQuery<
    findArticleReviewsByStudent,
    findArticleReviewsByStudentVariables
  >(ARTICE_REVIEWS_TO_COMPLETE_QUERY, {
    variables: {
      input: { studentId: me._id!, markingPeriod: currentMarkingPeriod },
    },
    pollInterval: 1000,
    onCompleted: (data) =>
      console.log(data.findArticleReviewsByStudent.articleReviews),
    onError: (error) => console.error(error),
  })

  // const articleReviewsForMarkingPeriod = data?.findArticleReviewsByStudent.articleReviews.filter(
  //   (articleReview) => articleReview.markingPeriod === currentMarkingPeriod
  // )

  return (
    <>
      <AssignmentTypeTitle>
        <div>Article Reviews to complete</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <>
          {data?.findArticleReviewsByStudent.articleReviews.length! === 0 ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>All Article Reviews for Marking Period Complete</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : (
            <AssignmentTypeContentContainer>
              <ul>
                {data?.findArticleReviewsByStudent.articleReviews &&
                  data?.findArticleReviewsByStudent.articleReviews
                    .filter((review) => !review.paperBased)
                    .map((review) => (
                      <li style={{ fontSize: '2rem' }}>
                        <AssignmentLink
                          to={`articleReview/toComplete/${review._id!}`}
                          key={review._id!}
                        >
                          {review.assignedDate}
                        </AssignmentLink>
                      </li>
                    ))}
              </ul>
            </AssignmentTypeContentContainer>
          )}
        </>
      )}
    </>
  )
}
