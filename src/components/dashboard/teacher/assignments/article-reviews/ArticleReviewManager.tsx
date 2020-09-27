import React, { FC } from 'react'
import { CreateArticleReviews } from './create-articleReviews/CreateArticleReviews'
import { ReviewArticleReviews } from './review-articleReviews/ReviewArticleReviews'
import { useArticleReviewContextProvider } from './state-styles/ArticleReviewContext'

export type ArticleReviewManagerProps = {}

export const ArticleReviewManager: FC<ArticleReviewManagerProps> = () => {
  const [state, event] = useArticleReviewContextProvider()
  console.log(state.value)
  return (
    <>
      <div>Article Reviews</div>
      <div
        onClick={() => {
          console.log('create')
          event({ type: 'CREATE' })
        }}
      >
        Create Article Reviews
      </div>
      <div
        onClick={() => {
          console.log('review')
          event({ type: 'REVIEW' })
        }}
      >
        Review Article Reviews
      </div>
      {state.matches('create') && <CreateArticleReviews />}
      {state.matches('review') && <ReviewArticleReviews />}
    </>
  )
}
