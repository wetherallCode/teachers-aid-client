import React from 'react'
import { findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides } from '../../../../../../schemaTypes'

export type IndividualReadingGuideReviewDisplayProps = {
  readingGuide: findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides
}

export const IndividualReadingGuideReviewDisplay = ({
  readingGuide,
}: IndividualReadingGuideReviewDisplayProps) => {
  const {
    biggestProblem,
    problems,
    howArePeopleInvolvedInProblems,
    importantPeople,
    reasonForBiggestProblem,
    sectionConsequences,
  } = readingGuide.readingGuideFinal!

  return (
    <>
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
    </>
  )
}
