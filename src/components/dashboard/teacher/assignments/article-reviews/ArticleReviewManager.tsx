import React, { FC } from 'react'
import { CreateArticleReviews } from './create-articleReviews/CreateArticleReviews'
import { ReviewArticleReviews } from './review-articleReviews/ReviewArticleReviews'
import { useArticleReviewContextProvider } from './state-styles/ArticleReviewContext'
import {
  ArticleReviewFunctionSelect,
  ArticleReviewMainMenuDisplay,
  ArticleReviewManagerContainer,
  ArticleReviewManagerMenu,
} from './state-styles/articleReviewStyles'

export type ArticleReviewManagerProps = {}

export const ArticleReviewManager = ({}: ArticleReviewManagerProps) => {
  const [state, event] = useArticleReviewContextProvider()

  return (
    <ArticleReviewManagerContainer>
      {state.matches('idle') && (
        <ArticleReviewManagerMenu>
          <ArticleReviewFunctionSelect>
            <div
              onClick={() => {
                console.log('create')
                event({ type: 'CREATE' })
              }}
            >
              Create
            </div>
            <div
              onClick={() => {
                console.log('review')
                event({ type: 'REVIEW' })
              }}
            >
              Review
            </div>
          </ArticleReviewFunctionSelect>
          <ArticleReviewMainMenuDisplay>
            <div>Article Reviews</div>
          </ArticleReviewMainMenuDisplay>
        </ArticleReviewManagerMenu>
      )}
      {state.matches('create') && <CreateArticleReviews />}
      {state.matches('review') && <ReviewArticleReviews />}
    </ArticleReviewManagerContainer>
  )
}
