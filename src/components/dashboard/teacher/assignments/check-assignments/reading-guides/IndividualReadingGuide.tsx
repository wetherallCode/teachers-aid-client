import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides,
  ReadingGuideReviewOptionsEnum,
} from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'

export type IndividualReadingGuideProps = {
  readingGuide: findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides
}

export const IndividualReadingGuide = ({
  readingGuide,
}: IndividualReadingGuideProps) => {
  const { readingGuideReviewOptionsEnum } = useEnumContextProvider()
  type NewType = ReadingGuideReviewOptionsEnum

  const [effort, setEffort] = useState<NewType>(
    readingGuideReviewOptionsEnum.GOOD_EFFORT
  )

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
    </>
  )
}
