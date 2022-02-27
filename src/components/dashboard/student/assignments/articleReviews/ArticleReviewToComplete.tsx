import { gql, useMutation, useQuery } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  findArticleReviewById,
  findArticleReviewByIdVariables,
  submitArticleReviewVariables,
  submitArticleReview,
} from '../../../../../schemaTypes'
import {
  AssignmentDetailsContainer,
  AssignmentDetailsDueDate,
  AssignmentDetailsGoBackButton,
  AssignmentDetailsGoBackButtonContainer,
  AssignmentDetailsPartContainers,
  AssignmentDetailsReadingInfo,
} from '../essays/assigned-essays/state-and-styles/assignedEssayStyles'
import { ArticleReviewToCompleteForm } from './ArticleReviewToCompleteForm'
import { useArticleReviewToCompleteContextProvider } from './state-styles/ArticleReviewToCompleteContext'
import {
  ArticleReviewContainer,
  ArticleReviewDetalisContainer,
  ArticleReviewHelpBody,
  ArticleReviewHelpHeader,
  ArticleReviewInfoContainer,
  ArticleReviewInfoSwitchButtonContainer,
  ArticleReviewSubmitButton,
  ArticleReviewToCompleteContainer,
} from './state-styles/articleReviewToCompleteStyles'

export type ArticleReviewToCompleteProps = {}

export const FIND_ARTICLE_REVIEW_BY_ID_QUERY = gql`
  query findArticleReviewById($input: FindArticleReviewByIdInput!) {
    findArticleReviewById(input: $input) {
      articleReview {
        _id
        articleAuthor
        articleLink
        articleTitle
        assignedDate
        bias
        dueDate
        assignedDate
        dueTime
        issue
        publishedDate
        solutions
        topicsImportance
        markingPeriod
      }
    }
  }
`

export const SUBMIT_ARTICLE_REVIEW_MUTATION = gql`
  mutation submitArticleReview($input: SubmitArticleReviewInput!) {
    submitArticleReview(input: $input) {
      articleReview {
        _id
      }
    }
  }
`

export const ArticleReviewToComplete: FC<ArticleReviewToCompleteProps> = () => {
  const { articleReviewToComplete } = useParams()
  const [toggled, setToggled] = useState(false)
  const navigate = useNavigate()

  const [state, event] = useArticleReviewToCompleteContextProvider()

  const { loading, data } = useQuery<
    findArticleReviewById,
    findArticleReviewByIdVariables
  >(FIND_ARTICLE_REVIEW_BY_ID_QUERY, {
    variables: {
      input: { articleReviewId: articleReviewToComplete! },
    },
    onCompleted: (data) => {
      const {
        articleAuthor,
        articleLink,
        _id,
        articleTitle,
        issue,
        topicsImportance,
        bias,
        publishedDate,
        solutions,
      } = data.findArticleReviewById.articleReview
      event({
        type: 'SET_INPUTS',
        payload: {
          articleAuthor,
          articleLink,
          articleReviewId: _id!,
          articleTitle,
          issue,
          topicsImportance,
          bias,
          publishedDate,
          solutions,
        },
      })
    },
    onError: (error) => console.error(error),
  })
  const [submitArticleReview] = useMutation<
    submitArticleReview,
    submitArticleReviewVariables
  >(SUBMIT_ARTICLE_REVIEW_MUTATION, {
    variables: {
      input: {
        articleReviewId: state.context.articleReviewToComplete.articleReviewId,
        markingPeriod: data?.findArticleReviewById.articleReview.markingPeriod!,
      },
    },
    onCompleted: () => navigate('/dashboard/assignments'),
    refetchQueries: ['findArticleReviewsByStudent'],
  })
  return (
    <ArticleReviewContainer>
      <ArticleReviewDetalisContainer>
        <AssignmentDetailsPartContainers>
          <AssignmentDetailsDueDate>
            Article Review due:{' '}
            {data?.findArticleReviewById.articleReview.dueDate} at{' '}
            {data?.findArticleReviewById.articleReview.dueTime}
          </AssignmentDetailsDueDate>
        </AssignmentDetailsPartContainers>
        <AssignmentDetailsGoBackButtonContainer>
          <AssignmentDetailsGoBackButton
            onClick={() => navigate('/dashboard/assignments')}
          >
            Go Back to Assignments
          </AssignmentDetailsGoBackButton>
        </AssignmentDetailsGoBackButtonContainer>
      </ArticleReviewDetalisContainer>
      <ArticleReviewToCompleteContainer>
        {data?.findArticleReviewById.articleReview && (
          <>
            <ArticleReviewToCompleteForm
              articleReviewInfo={data?.findArticleReviewById.articleReview!}
            />
            {!toggled ? (
              <ArticleReviewSubmitButton
                toggled={toggled}
                onClick={() => setToggled(true)}
              >
                Submit
              </ArticleReviewSubmitButton>
            ) : (
              <ArticleReviewSubmitButton
                toggled={toggled}
                onClick={() => submitArticleReview()}
              >
                Are You Sure?
              </ArticleReviewSubmitButton>
            )}
          </>
        )}
      </ArticleReviewToCompleteContainer>
      <ArticleReviewInfoContainer>
        <ArticleReviewHelpHeader>Help</ArticleReviewHelpHeader>
        <ArticleReviewHelpBody>
          <ul>
            <li>
              To be successful with these assignments, do a google search about
              a current events topic about the world that interests you.
            </li>
            <br />
            <li>
              If you don't have a topic in mind, just search "Recent Current
              Events" and click "News" below the search bar.
            </li>
            <br />
            <li>
              Try to find an article that presents an issue that you think is
              important.
            </li>
            <br />
            <li>Any question with a red star is required for full credit.</li>
          </ul>
        </ArticleReviewHelpBody>
      </ArticleReviewInfoContainer>
    </ArticleReviewContainer>
  )
}
