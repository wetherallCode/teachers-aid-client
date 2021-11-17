import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides,
  ReadingGuideReviewOptionsEnum,
  reviewReadingGuides,
  reviewReadingGuidesVariables,
} from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'

export type IndividualReadingGuideReviewDisplayProps = {
  readingGuide: findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides
}

export const REVIEW_READING_GUIDE_MUTATION = gql`
  mutation reviewReadingGuides($input: ReviewReadingGuidesInput!) {
    reviewReadingGuides(input: $input) {
      reviewed
    }
  }
`

export const IndividualReadingGuideReviewDisplay = ({
  readingGuide,
}: IndividualReadingGuideReviewDisplayProps) => {
  const { readingGuideReviewOptionsEnum } = useEnumContextProvider()
  const [effort, setEffort] = useState<ReadingGuideReviewOptionsEnum>(
    readingGuideReviewOptionsEnum.GOOD_EFFORT
  )
  const {
    biggestProblem,
    problems,
    howArePeopleInvolvedInProblems,
    importantPeople,
    reasonForBiggestProblem,
    sectionConsequences,
  } = readingGuide.readingGuideFinal!
  const [reviewReadingGuides] = useMutation<
    reviewReadingGuides,
    reviewReadingGuidesVariables
  >(REVIEW_READING_GUIDE_MUTATION, {
    variables: {
      input: { effort, readingGuideId: readingGuide._id! },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <div>
      <div>
        {readingGuide.hasOwner.firstName} {readingGuide.hasOwner.lastName}
      </div>
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
      <div>
        {readingGuideReviewOptionsEnum.map(
          (review: ReadingGuideReviewOptionsEnum) => (
            <button key={review}>
              {phraseCapitalizer(underscoreEliminator(review))}
            </button>
          )
        )}
      </div>
    </div>
  )
}
