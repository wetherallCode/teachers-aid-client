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
  type NewType = ReadingGuideReviewOptionsEnum

  const [effort, setEffort] = useState<NewType>(
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

  const {
    problems,
    biggestProblem,
    reasonForBiggestProblem,
    importantPeople,
    howArePeopleInvolvedInProblems,
    sectionConsequences,
  } = readingGuide.readingGuideFinal!
  return (
    <>
      <div>
        <div>
          {readingGuide.hasOwner.firstName} {readingGuide.hasOwner.lastName}
        </div>
        <div>Reading Guide: {readingGuide.readings.readingSections}</div>
        <div>
          <div>Problems</div>
          <div>
            {problems.map((p, i: number) => (
              <div key={i}>{p}</div>
            ))}
          </div>
        </div>
        <div>
          <div>Biggest Problem</div>
          <div>{biggestProblem}</div>
        </div>
        <div>
          <div>Why is this the biggest problem?</div>
          <div>{reasonForBiggestProblem}</div>
        </div>
        <div>
          <div>Important People</div>
          <div>
            {importantPeople.map((p, i: number) => (
              <div key={i}>{p}</div>
            ))}
          </div>
        </div>
        <div>
          <div>How are these people involved?</div>
          <div>{howArePeopleInvolvedInProblems}</div>
        </div>
        <div>
          <div>Consequences</div>
          <div>{sectionConsequences}</div>
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
