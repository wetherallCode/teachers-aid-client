import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
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
  AssignmentLinkLi,
} from '../assignmentsStyles'
import { useStudentAssignmentContextProvider } from '../StudentAssignmentContext'

export type ArticleReviewSelectProps = {}
export const ARTICE_REVIEWS_TO_COMPLETE_QUERY = gql`
  query findArticleReviewsByStudent($input: FindArticleReviewsByStudentInput!) {
    findArticleReviewsByStudent(input: $input) {
      articleReviews {
        _id
        assignedDate
        paperBased
        markingPeriod
        submitted
      }
    }
  }
`
export const ArticleReviewSelect: FC<ArticleReviewSelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const [state] = useStudentAssignmentContextProvider()

  const { loading, data } = useQuery<
    findArticleReviewsByStudent,
    findArticleReviewsByStudentVariables
  >(ARTICE_REVIEWS_TO_COMPLETE_QUERY, {
    variables: {
      input: {
        studentId: me._id!,
        markingPeriod: state.context.selectedMarkingPeriod,
      },
    },
    pollInterval: 1000,
    onCompleted: (data) =>
      console.log(data.findArticleReviewsByStudent.articleReviews),
    onError: (error) => console.error(error),
  })

  const articleReviewsForMarkingPeriod = data?.findArticleReviewsByStudent.articleReviews.filter(
    (articleReview) =>
      articleReview.markingPeriod === state.context.selectedMarkingPeriod &&
      !articleReview.submitted
  )

  return (
    <>
      <AssignmentTypeTitle>
        <div>Article Reviews to complete</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <>
          {articleReviewsForMarkingPeriod!.length === 0 ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>All Article Reviews for Marking Period Complete</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : (
            <AssignmentTypeContentContainer>
              {articleReviewsForMarkingPeriod!
                .filter((review) => !review.paperBased)
                .map((review) => (
                  <ul key={review._id!}>
                    <AssignmentLinkLi>
                      <AssignmentLink
                        to={`articleReview/toComplete/${review._id!}`}
                      >
                        {review.assignedDate}
                      </AssignmentLink>
                    </AssignmentLinkLi>
                  </ul>
                ))}
            </AssignmentTypeContentContainer>
          )}
          {data?.findArticleReviewsByStudent.articleReviews.length === 0 && (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>No Article Reviews Assigned</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          )}
        </>
      )}
    </>
  )
}
