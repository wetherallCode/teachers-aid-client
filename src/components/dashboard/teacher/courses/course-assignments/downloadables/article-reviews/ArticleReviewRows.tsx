import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews } from '../../../../../../../schemaTypes'

export type ArticleReviewRowsProps = {
  articleReview: findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews
  setAssignmentList: Dispatch<SetStateAction<any[]>>
  createCSVToggle: boolean
}

export const ArticleReviewRows: FC<ArticleReviewRowsProps> = ({
  articleReview,
  setAssignmentList,
  createCSVToggle,
}) => {
  const [assignmentValues, setAssignmentValues] = useState({
    NAME:
      articleReview.hasOwner.lastName + ', ' + articleReview.hasOwner.firstName,
    STUDENTID: articleReview.hasOwner.schoolId,
    GRADE: articleReview.score.earnedPoints,
    ABSENT: '',
    EXEMPT: '',
    INCOMPLETE: '',
    MISSING: articleReview.score.earnedPoints < 5 ? 'Y' : '',
  })

  useEffect(() => {
    // if (createCSVToggle) {
    if (articleReview.hasOwner.schoolId !== null) {
      setAssignmentList((list) => [...list, assignmentValues])
    }
    // }
  }, [articleReview])

  return (
    <>
      <div>
        <span>{articleReview.hasOwner.lastName}, </span>
        <span>{articleReview.hasOwner.firstName}: </span>
        {articleReview.score.earnedPoints > 5 ? (
          <span>{articleReview.score.earnedPoints}</span>
        ) : (
          <span>Missing</span>
        )}
      </div>
    </>
  )
}
