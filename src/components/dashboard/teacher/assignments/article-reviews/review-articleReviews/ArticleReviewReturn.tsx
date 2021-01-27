import { gql, useMutation } from '@apollo/client'
import React, { FC } from 'react'
import {
  returnArticleReview,
  returnArticleReviewVariables,
} from '../../../../../../schemaTypes'
import { useArticleReviewContextProvider } from '../state-styles/ArticleReviewContext'
import {
  ReturnedStatus,
  ReturnReview,
} from '../state-styles/articleReviewStyles'

export type ArticleReviewReturnProps = {
  reviewId: string
}

export const RETURN_ARTICLE_REVIEW_MUTATION = gql`
  mutation returnArticleReview($input: ReturnArticleReviewInput!) {
    returnArticleReview(input: $input) {
      articleReview {
        _id
      }
    }
  }
`

export const ArticleReviewReturn: FC<ArticleReviewReturnProps> = ({
  reviewId,
}) => {
  const [state, event] = useArticleReviewContextProvider()
  const [returnArticleReview] = useMutation<
    returnArticleReview,
    returnArticleReviewVariables
  >(RETURN_ARTICLE_REVIEW_MUTATION, {
    variables: { input: { articleReviewId: reviewId } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findArticleReviewsByCourse'],
  })
  return (
    <ReturnReview onClick={() => returnArticleReview()}>
      <div>Return</div>
    </ReturnReview>
  )
}
