import { gql, useMutation } from '@apollo/client'
import React, { FC, useEffect } from 'react'
import {
  findArticleReviewById_findArticleReviewById_articleReview,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateArticleReview,
  updateArticleReviewVariables,
} from '../../../../../schemaTypes'
import { useArticleReviewToCompleteContextProvider } from './state-styles/ArticleReviewToCompleteContext'
import {
  ArticleReviewArticleImportanceContainer,
  ArticleReviewArticleImportanceInput,
  ArticleReviewArticleLinkContainer,
  ArticleReviewArticleLinkInput,
  ArticleReviewArticleNameContainer,
  ArticleReviewArticleNameInput,
  ArticleReviewAuthorContainer,
  ArticleReviewAuthorInput,
  ArticleReviewBiasContainer,
  ArticleReviewBiasSelect,
  ArticleReviewHeader,
  ArticleReviewIssueContainer,
  ArticleReviewIssueInput,
  ArticleReviewSolutionsContainer,
  ArticleReviewSolutionsInput,
  ArticleReviewToCompleteInformationContainer,
  Required,
} from './state-styles/articleReviewToCompleteStyles'

export type ArticleReviewToCompleteFormProps = {
  articleReviewInfo: findArticleReviewById_findArticleReviewById_articleReview
}

export const UPDATE_ARTICLE_REVIEW_MUTATION = gql`
  mutation updateArticleReview($input: UpdateArticleReviewInput!) {
    updateArticleReview(input: $input) {
      articleReview {
        _id
      }
    }
  }
`
export const ArticleReviewToCompleteForm: FC<
  ArticleReviewToCompleteFormProps
> = ({ articleReviewInfo }) => {
  const [state, event] = useArticleReviewToCompleteContextProvider()
  const [updateArticleReview] = useMutation<
    updateArticleReview,
    updateArticleReviewVariables
  >(UPDATE_ARTICLE_REVIEW_MUTATION, {
    variables: { input: state.context.articleReviewToComplete },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findArticleReviewById'],
  })

  useEffect(() => {
    if (state.context.articleReviewToComplete.articleReviewId) {
      updateArticleReview()
    }
  }, [state.context.articleReviewToComplete])
  return (
    <>
      <ArticleReviewHeader>
        <div>Article Review</div>
      </ArticleReviewHeader>
      <ArticleReviewToCompleteInformationContainer>
        <ArticleReviewArticleNameContainer>
          <div>
            <Required>* </Required>
            Name of the Article:
          </div>
          <ArticleReviewArticleNameInput
            value={state.context.articleReviewToComplete.articleTitle}
            onChange={(e: any) =>
              event({ type: 'SET_TITLE', payload: e.target.value })
            }
          />
        </ArticleReviewArticleNameContainer>
        <ArticleReviewArticleLinkContainer>
          <div>
            <Required>* </Required>
            Link to Article:
          </div>
          <ArticleReviewArticleLinkInput
            value={state.context.articleReviewToComplete.articleLink}
            onChange={(e: any) =>
              event({ type: 'SET_LINK', payload: e.target.value })
            }
          />
        </ArticleReviewArticleLinkContainer>
        <ArticleReviewAuthorContainer>
          <div>
            <Required>* </Required> Article's Author:{' '}
          </div>
          <ArticleReviewAuthorInput
            value={state.context.articleReviewToComplete.articleAuthor}
            onChange={(e: any) =>
              event({ type: 'SET_AUTHOR', payload: e.target.value })
            }
          />
        </ArticleReviewAuthorContainer>
        <ArticleReviewIssueContainer>
          <div>
            <Required>* </Required> What was the problem or issue the author was
            trying to explain?{' '}
          </div>
          <ArticleReviewIssueInput
            value={state.context.articleReviewToComplete.issue}
            onChange={(e: any) =>
              event({ type: 'SET_ISSUE', payload: e.target.value })
            }
          />
        </ArticleReviewIssueContainer>
        <ArticleReviewBiasContainer>
          <div>Were both sides of the problem or issue represented?</div>
          <ArticleReviewBiasSelect
            value={
              state.context.articleReviewToComplete.bias === null
                ? 'none'
                : state.context.articleReviewToComplete.bias
                  ? 'true'
                  : 'false'
            }
            onChange={(e: any) =>
              event({
                type: 'SET_BIAS',
                payload:
                  e.target.value === 'true'
                    ? true
                    : e.target.value === 'none'
                      ? null
                      : false,
              })
            }
          >
            <option value={'none'}>Pick Yes or No</option>
            <option value={'true'}>Yes</option>
            <option value={'false'}>No</option>
          </ArticleReviewBiasSelect>
        </ArticleReviewBiasContainer>
        <ArticleReviewSolutionsContainer>
          <div>
            What solutions (if any) to the problem were given in the article?
          </div>
          <ArticleReviewSolutionsInput
            value={
              state.context.articleReviewToComplete.solutions
                ? state.context.articleReviewToComplete.solutions
                : ''
            }
            onChange={(e: any) =>
              event({ type: 'SET_SOLUTIONS', payload: e.target.value })
            }
          />
        </ArticleReviewSolutionsContainer>
        <ArticleReviewArticleImportanceContainer>
          <div>
            <Required>* </Required> Why do you think this topic is important?
          </div>
          <ArticleReviewArticleImportanceInput
            value={state.context.articleReviewToComplete.topicsImportance}
            onChange={(e: any) =>
              event({ type: 'SET_TOPICS_IMPORTANCE', payload: e.target.value })
            }
          />
        </ArticleReviewArticleImportanceContainer>
      </ArticleReviewToCompleteInformationContainer>
    </>
  )
}
