import { gql, useMutation } from '@apollo/client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides,
  ReadingGuideReviewOptionsEnum,
  reviewReadingGuidesVariables,
  reviewReadingGuides,
} from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'
import { REVIEW_READING_GUIDE_MUTATION } from '../../../teachers-aid/main-screen/readingGuideViewer/IndividualReadingGuideReviewDisplay'

export type IndividualReadingGuideProps = {
  readingGuide: findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides
  setReadingGuideToReview: Dispatch<
    SetStateAction<findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides | null>
  >
  readingGuidesToCheck: findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides[]
}

export const IndividualReadingGuide = ({
  readingGuide,
  setReadingGuideToReview,
  readingGuidesToCheck,
}: IndividualReadingGuideProps) => {
  const { readingGuideReviewOptionsEnum } = useEnumContextProvider()

  const [effort, setEffort] = useState<ReadingGuideReviewOptionsEnum>(
    readingGuideReviewOptionsEnum.GOOD_EFFORT
  )

  const [reviewReadingGuides] = useMutation<
    reviewReadingGuides,
    reviewReadingGuidesVariables
  >(REVIEW_READING_GUIDE_MUTATION, {
    onCompleted: () =>
      setReadingGuideToReview(
        readingGuidesToCheck[readingGuidesToCheck.length - 2]
      ),
    refetchQueries: ['findReadingGuidesByMarkingPeriod'],
  })

  const { readingGuideQuestions } = readingGuide.readingGuideFinal!

  return (
    <>
      <div>
        <div>
          {readingGuide.hasOwner.firstName} {readingGuide.hasOwner.lastName}
        </div>
        <div>Reading Guide: {readingGuide.readings.readingSections}</div>
        <div>
          {readingGuideQuestions?.map((q) => (
            <div key={q.questionType}>
              <div>{q.questionType}</div>
              <br />
              <div>{q.answer}</div>
            </div>
          ))}
        </div>
        <div>Effort: {readingGuide.effort}</div>
        <div>
          {readingGuideReviewOptionsEnum.map(
            (review: ReadingGuideReviewOptionsEnum) => (
              <button
                key={review}
                onClick={() =>
                  reviewReadingGuides({
                    variables: {
                      input: {
                        effort: review,
                        readingGuideId: readingGuide._id!,
                      },
                    },
                  })
                }
              >
                {phraseCapitalizer(underscoreEliminator(review))}
              </button>
            )
          )}
        </div>
      </div>
    </>
  )
}
